"use server";

import weaviate, {
  Collection,
  WeaviateClient,
  WeaviateGenericObject,
  Filters,
  WeaviateNonGenericObject,
} from "weaviate-client";
import { Effects, skinTypeMapping, UserInformation } from "../types";
import { Product, Stack, WeaviateProduct } from "./types";

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
  console.time("queryEffects");

  const filters = collection.filter
    .byProperty("category")
    .containsAny(categories);

  const negative_result = await collection.query.nearText(query, {
    limit: 10,
    targetVector: "negative",
    filters: filters,
  });

  const excluded_uuids = negative_result.objects.map((obj) => obj.uuid);

  const positive_result = await collection.query.nearText(query, {
    limit: 10,
    targetVector: "positive",
    filters: filters,
  });

  const result = positive_result.objects.filter(
    (obj) => !excluded_uuids.includes(obj.uuid)
  );

  console.timeEnd("queryEffects");
  return result;
};

function getXLImageUrl(originalUrl: string) {
  return originalUrl.replace("/M_", "/XL_");
}

function getXXLImageUrl(originalUrl: string) {
  return originalUrl.replace("/M_", "/XXL_");
}

const convertToProduct = (
  result: WeaviateGenericObject<WeaviateProduct>
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
    ingredients: result.properties.ingredients,
    ingredient_groups: result.properties.ingredient_groups,
    url: result.properties.url,
    description: result.properties.description,
    uuid: result.uuid,
    explanation: "",
  };

  return new_product;
};

export async function getStack(userInformation: UserInformation) {
  const client = await createClient();
  const collection = await client.collections.get<WeaviateProduct>(
    "Products_v2"
  );
  const cleanser = await getProducts(
    "Cleanser",
    ["Face Washes", "Face Cleansers"],
    collection,
    userInformation
  );

  const moisturizer = await getProducts(
    "Moisturizer",
    ["Face Creams", "Moisturizers"],
    collection,
    userInformation
  );

  const stack: Stack = {
    cleanser: cleanser,
    moisturizer: moisturizer,
    sunscreen: null,
  };

  return stack;
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
    const product = convertToProduct(products[0]);
    return product;
  }
};
