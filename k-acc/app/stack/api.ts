"use server";

import weaviate, {
  Collection,
  WeaviateClient,
  WeaviateGenericObject,
} from "weaviate-client";
import { Effects, skinTypeMapping, UserInformation } from "../types";
import {
  Details,
  Product,
  Stack,
  StackPayload,
  WeaviateProduct,
} from "./types";
import OpenAI from "openai";

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_API_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

const createClient = async (): Promise<WeaviateClient> => {
  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
    weaviateURL,
    {
      authCredentials: new weaviate.ApiKey(weaviateKey),
      headers: {
        "X-OpenAI-Api-Key": openaiKey,
      },
    }
  );
  const isReady = await client.isReady();
  console.log("Client is ready:", isReady);
  return client;
};

const generateQuery = (category: string, userInformation: UserInformation) => {
  const { skinType, sensitive, skinTone, goals, conditions } = userInformation;
  const skinTypeLabel =
    skinTypeMapping[skinType as keyof typeof skinTypeMapping][0];

  const parts = [
    category,
    "product for",
    skinTypeLabel,
    sensitive ? "Sensitive" : "",
    "Skin",
    "with skin tone",
    skinTone,
    "FST",
    goals.length > 0
      ? "to achieve " +
        goals.map((goal) => Effects[goal].displayName).join(", ")
      : "",
    conditions.length > 0
      ? "and reduce " +
        conditions.map((condition) => Effects[condition].displayName).join(", ")
      : "",
  ];

  return parts.filter(Boolean).join(" ").trim();
};

const queryEffects = async (
  collection: Collection<WeaviateProduct>,
  query: string,
  categories: string[]
) => {
  console.time("Querying for " + categories.join(", "));

  const filters = collection.filter
    .byProperty("category")
    .containsAny(categories);

  const negative_result = await collection.query.nearText(query, {
    limit: 10,
    targetVector: "negative",
    filters: filters,
  });

  const positive_result = await collection.query.nearText(query, {
    limit: 10,
    targetVector: "positive",
    filters: filters,
  });

  const excluded_uuids = negative_result.objects.map((obj) => obj.uuid);

  const result = positive_result.objects.filter(
    (obj) => !excluded_uuids.includes(obj.uuid)
  );

  console.timeEnd("Querying for " + categories.join(", "));
  return result;
};

function getXLImageUrl(originalUrl: string) {
  return originalUrl.replace("/M_", "/XL_");
}

function getXXLImageUrl(originalUrl: string) {
  return originalUrl.replace("/M_", "/XXL_");
}

const convertToProduct = (
  result: WeaviateGenericObject<WeaviateProduct>,
  explanation: string
): Product => {
  const new_product: Product = {
    name: result.properties.name,
    brand: result.properties.brand,
    category: result.properties.category,
    positive_effects: result.properties.positive_effects,
    negative_effects: result.properties.negative_effects,
    pid: result.properties.pid,
    bid: result.properties.bid,
    brand_about: result.properties.brand_about,
    image: result.properties.image,
    image_xl: getXLImageUrl(result.properties.image),
    image_xxl: getXXLImageUrl(result.properties.image),
    price: result.properties.price,
    review_count: result.properties.review_count,
    score_percentage: result.properties.score_percentage,
    ingredients: result.properties.ingredients.split(","),
    ingredient_groups: result.properties.ingredient_groups,
    url: result.properties.url,
    description: result.properties.description,
    uuid: result.uuid,
    explanation: explanation,
  };

  return new_product;
};

const convertToDetails = (
  result: WeaviateGenericObject<WeaviateProduct>[]
): Details[] => {
  const new_details: Details[] = result.map((product) => ({
    id: product.uuid,
    name: product.properties.name,
    ingredients: product.properties.ingredients,
  }));
  return new_details;
};

const openai = new OpenAI({
  apiKey: openaiKey,
});

type ProductSelection = {
  product_id: string;
  explanation: string;
};

const selectProduct = async (
  products: WeaviateGenericObject<WeaviateProduct>[],
  query: string,
  label: string
): Promise<Product> => {
  const details = convertToDetails(products);

  console.time("Selecting product for " + label);

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a skincare expert helping to select the most suitable product based on user requirements and ingredient analysis.",
      },
      {
        role: "user",
        content: `Select the best ${label} from these products for this request: "${query}"\n\nProducts:\n${JSON.stringify(
          details,
          null,
          2
        )}`,
      },
    ],
    functions: [
      {
        name: "select_product",
        description:
          "Select the most suitable product based on the user information and provide explanations. Make sure to use ingredients that don't harm sensitive skin or can make existing conditions worse.",
        parameters: {
          type: "object",
          properties: {
            product_id: {
              type: "string",
              description: "The UUID of the selected product",
            },
            explanation: {
              type: "string",
              description:
                "One sentence explanation of how this product can help with its ingredients. Don't mention the product name, just the ingredients.",
            },
          },
          required: ["product_id", "explanation"],
        },
      },
    ],
    function_call: { name: "select_product" },
  });

  const functionCall = response.choices[0].message.function_call;
  if (!functionCall || !functionCall.arguments) {
    throw new Error("Failed to get product selection from OpenAI");
  }

  const result = JSON.parse(functionCall.arguments) as ProductSelection;

  const product = products.find(
    (product) => product.uuid === result.product_id
  );
  if (!product) {
    throw new Error("Selected product not found in the list");
  }

  const new_product = convertToProduct(product, result.explanation);

  console.timeEnd("Selecting product for " + label);

  return new_product;
};

const describeStack = async (stack: Stack, query: string) => {
  const cleanser = stack.cleanser;
  const moisturizer = stack.moisturizer;
  const sunscreen = stack.sunscreen;

  const cleanser_details = {
    name: cleanser?.name,
    ingredients: cleanser?.ingredients,
    explanation: cleanser?.explanation,
  };

  const moisturizer_details = {
    name: moisturizer?.name,
    ingredients: moisturizer?.ingredients,
    explanation: moisturizer?.explanation,
  };

  const sunscreen_details = {
    name: sunscreen?.name,
    ingredients: sunscreen?.ingredients,
    explanation: sunscreen?.explanation,
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a skincare expert helping to describe a skincare stack based on user requirements and ingredient analysis.",
      },
      {
        role: "user",
        content: `Answer the question "Why we picked this stack for you?" based on the following skincare stack and its ingredients for this user: Cleanser: ${JSON.stringify(
          cleanser_details,
          null,
          2
        )} Moisturizer: ${JSON.stringify(
          moisturizer_details,
          null,
          2
        )} Sunscreen: ${JSON.stringify(
          sunscreen_details,
          null,
          2
        )} based on the user's request: "${query}" in one single short sentence. Don't repeat the user query. Don't mention "user", mention as "you" instead. Act as a companion, not a salesperson, just talk about how the ingredients work together and answer the question. Don't start with 'This skincare stack...' put mentions of condtions or any other effects in <strong> brackets`,
      },
    ],
  });

  return response.choices[0].message.content;
};

export async function getStack(userInformation: UserInformation) {
  const client = await createClient();
  const collection = await client.collections.get<WeaviateProduct>(
    "Products_v2"
  );
  const cleanserPromise = getProducts(
    "Cleanser",
    ["Face Washes", "Face Cleansers"],
    collection,
    userInformation
  );

  const moisturizerPromise = getProducts(
    "Moisturizer",
    ["Face Creams", "Moisturizers"],
    collection,
    userInformation
  );

  const sunscreenPromise = getProducts(
    "Sunscreen",
    ["Sunscreens & Sun Care"],
    collection,
    userInformation
  );

  const [cleanser, moisturizer, sunscreen] = await Promise.all([
    cleanserPromise,
    moisturizerPromise,
    sunscreenPromise,
  ]);

  const stack: Stack = {
    cleanser: cleanser,
    moisturizer: moisturizer,
    sunscreen: sunscreen,
  };

  const globalQuery = generateQuery("Skin Care", userInformation);
  const description = await describeStack(stack, globalQuery);

  const stackPayload: StackPayload = {
    stack: stack,
    description: description || "",
  };

  return stackPayload;
}

const getProducts = async (
  category: string,
  categories: string[],
  collection: Collection<WeaviateProduct>,
  userInformation: UserInformation
) => {
  const query = generateQuery(category, userInformation);
  const products = await queryEffects(collection, query, categories);

  if (products.length === 0) {
    return null;
  } else {
    const product = await selectProduct(products, query, category);
    return product;
  }
};
