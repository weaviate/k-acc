"use server";

import { SearchRequest } from "@/types/search";
import { Product, emptyProduct } from "@/types/products";
import weaviate, { WeaviateClient, Filters } from "weaviate-client";
import { SurveyAnswers, SurveyResults, UserData } from "@/types/survey";
import { Filter } from "@/types/search";

async function connectToWeaviate() {
  const weaviateURL = process.env.WEAVIATE_URL as string;
  const weaviateKey = process.env.WEAVIATE_API_KEY as string;
  const openaiKey = process.env.OPENAI_API_KEY as string;

  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
    weaviateURL,
    {
      authCredentials: new weaviate.ApiKey(weaviateKey),
      headers: {
        "X-OpenAI-Api-Key": openaiKey,
      },
    },
  );

  return client;
}

async function getProductUUID(productId: string) {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  const result = await products.query.fetchObjects({
    filters: products.filter.byProperty("product_id").equal(productId),
    limit: 1,
  });

  return result.objects[0].uuid;
}

export async function getProduct(productId: string) {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  const result = await products.query.fetchObjects({
    filters: products.filter.byProperty("product_id").equal(productId),
    limit: 1,
  });

  return (result.objects[0]?.properties as unknown as Product) || emptyProduct;
}

export async function searchProducts(searchRequest: SearchRequest) {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  const weaviateFilters = [];
  for (let filter of searchRequest.filters) {
    if (filter.type === "MULTI" && filter.values) {
      weaviateFilters.push(products.filter.byProperty(filter.name).containsAny(filter.values));
    } else if (filter.type === "SINGLE" && filter.value) {
      weaviateFilters.push(products.filter.byProperty(filter.name).equal(filter.value));
    } else if (filter.type === "RANGE" && filter.min && filter.max) {
      weaviateFilters.push(Filters.and(products.filter.byProperty(filter.name).greaterThan(filter.min), products.filter.byProperty(filter.name).lessThan(filter.max)));
    }
  }

  let result;
  if (searchRequest.query !== "") {
    result = await products.query.hybrid(searchRequest.query, {
      limit: searchRequest.size,
      offset: searchRequest.page,
      filters: Filters.and(...weaviateFilters),
    });
  } else {
    result = await products.query.fetchObjects({
      limit: searchRequest.size,
      offset: searchRequest.page,
      filters: Filters.and(...weaviateFilters),
    });
  }

  const product_results: Product[] = result.objects.map(
    (item) => item.properties as unknown as Product,
  );
  return product_results || [];
}

export async function getRecommendations(productId: string) {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  const productUUID = await getProductUUID(productId);
  const result = await products.query.nearObject(productUUID, {
    limit: 5,
  });

  const product_results: Product[] = result.objects.map(
    (item) => item.properties as unknown as Product,
  );
  return product_results || [];
}

export async function getSurveyResults(surveyAnswers: SurveyAnswers): Promise<SurveyResults> {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  const userData: UserData = {
    skinTone: surveyAnswers.answers[1].selected_options[0],
    skinType: surveyAnswers.answers[2].selected_options[0],
    goals: surveyAnswers.answers[3].selected_options,
    concerns: [...surveyAnswers.answers[4].selected_options, ...surveyAnswers.answers[5].selected_options],
    age: surveyAnswers.answers[6].selected_options[0],
    sensitive: surveyAnswers.answers[7].selected_options[0] === "Yes" ? true : false,
  }

  // main stack
  const cleanser = {prompt: `Face cleanser for ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}, ${userData.concerns.join(', ')}`, categories: ["Face Cleansers", "Face Washes"]}
  const moisturizer = {prompt: `Face moisturizer for ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}, ${userData.concerns.join(', ')}`, categories: ["Moisturizers"]}
  const suncare = {prompt: `Sunscreen for ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}, ${userData.concerns.join(', ')}`, categories: ["Sunscreens & Sun Care"]}

  const productsMain: Product[] = [];
  for (let product of [cleanser, moisturizer, suncare]) {
    const products = await searchProductsByPrompt(product.prompt, product.categories);
    productsMain.push(...products);
  }

 // additional
  

  const userSummary = await getProductSummary(productsMain, userData);

  const surveyResults: SurveyResults = {
    text: userSummary,
    productsMain: productsMain,
    productsAdditional: [],
  };

  return surveyResults;
}

async function searchProductsByPrompt(prompt: string, categories: string[]): Promise<Product[]> {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  const result = await products.query.hybrid(prompt, {
    limit: 1,
    filters: Filters.or(...categories.map(category => products.filter.byProperty("category").equal(category))),
  });

  const product_results: Product[] = result.objects.map(
    (item) => item.properties as unknown as Product,
  );
  return product_results || [];
}

async function getProductSummary(productSuggestions: Product[], userData: UserData) {


  return "Here's your summary"
}