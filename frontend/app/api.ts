"use server";

import { SearchRequest, SearchResponse } from "@/types/search";
import { Product, emptyProduct } from "@/types/products";
import weaviate, { WeaviateClient, Filters } from "weaviate-client";
import { SurveyAnswers, SurveyResults, UserData } from "@/types/survey";
import { Filter } from "@/types/search";

const collectionName = "ProductDataV2";

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
  const products = client.collections.get(collectionName);

  const result = await products.query.fetchObjects({
    filters: products.filter.byProperty("product_id").equal(productId),
    limit: 1,
  });

  return result.objects[0].uuid;
}

export async function getProduct(productId: string) {
  const client = await connectToWeaviate();
  const products = client.collections.get(collectionName);

  const result = await products.query.fetchObjects({
    filters: products.filter.byProperty("product_id").equal(productId),
    limit: 1,
  });

  return (result.objects[0]?.properties as unknown as Product) || emptyProduct;
}

export async function searchProducts(searchRequest: SearchRequest) {
  const client = await connectToWeaviate();
  const products = client.collections.get(collectionName);

  const aggregateResponse = await executeAggregation(searchRequest);

  // const weaviateFilters = [];
  // for (let filter of searchRequest.filters) {
  //   if (filter.type === "MULTI" && filter.values) {
  //     weaviateFilters.push(products.filter.byProperty(filter.name).containsAny(filter.values));
  //   } else if (filter.type === "SINGLE" && filter.value) {
  //     weaviateFilters.push(products.filter.byProperty(filter.name).equal(filter.value));
  //   } else if (filter.type === "RANGE" && filter.min && filter.max) {
  //     weaviateFilters.push(Filters.and(products.filter.byProperty(filter.name).greaterThan(filter.min), products.filter.byProperty(filter.name).lessThan(filter.max)));
  //   }
  // }

  let result;
  if (searchRequest.query !== "") {
    result = await products.query.nearText(searchRequest.query, {
      limit: searchRequest.size,
      offset: searchRequest.page,
      // filters: Filters.and(...weaviateFilters),
    });
  } else {
    result = await products.query.fetchObjects({
      limit: searchRequest.size,
      offset: searchRequest.page,
      // filters: Filters.and(...weaviateFilters),
    });
  }

  const product_results: Product[] = result.objects.map(
    (item) => item.properties as unknown as Product,
  );
  return product_results || [];
}

export async function getRecommendations(productId: string) {
  const client = await connectToWeaviate();
  const products = client.collections.get(collectionName);

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
  const products = client.collections.get(collectionName);

  const userData: UserData = {
    skinTone: surveyAnswers.answers[1].selected_options[0],
    skinType: surveyAnswers.answers[2].selected_options[0],
    goals: surveyAnswers.answers[3].selected_options,
    concerns: [...surveyAnswers.answers[4].selected_options, ...surveyAnswers.answers[5].selected_options],
    age: surveyAnswers.answers[6].selected_options[0],
    sensitive: surveyAnswers.answers[7].selected_options[0] === "Yes" ? true : false,
  }

  // main stack
  const cleanser = {name: "Cleanser", prompt: `Face cleanser for ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}, ${userData.concerns.join(', ')}`, categories: ["Face Cleansers", "Face Washes"]}
  const moisturizer = {name: "Moisturizer", prompt: `Face moisturizer for ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}, ${userData.concerns.join(', ')}`, categories: ["Moisturizers"]}
  const suncare = {name: "Sunscreen", prompt: `Sunscreen for ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}, ${userData.concerns.join(', ')}`, categories: ["Sunscreens & Sun Care"]}

  const productsMain: Record<string, Product> = {};
  for (let category of [cleanser, moisturizer, suncare]) {
    const results = await searchProductsByPrompt(category.prompt, category.categories);
    productsMain[category.name] = results[0];
  }

  // additional
  const productsAdditional: Record<string, Product> = {};
  for (let concern of userData.concerns) {
    if (concern !== "None") {
      const additional = {name: `Concern: ${concern}`, prompt: `${concern}, ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}`, categories: ["Face Serums", "Face Masks", "Eye Care", "Face Care", "Face Creams", "Acne & Spot Treatments"]}
      const results = await searchProductsByPrompt(additional.prompt, additional.categories);
      productsAdditional[additional.name] = results[0];
    }
  }
  for (let goal of userData.goals) {
    const additional = {name: `Goal: ${goal}`, prompt: `${goal}, ${userData.skinType} skin, ${userData.sensitive ? "sensitive skin" : ""}`, categories: ["Face Serums", "Face Masks", "Eye Care", "Face Care", "Face Creams", "Acne & Spot Treatments"]}
    const results = await searchProductsByPrompt(additional.prompt, additional.categories);
    productsAdditional[additional.name] = results[0];
  }

  const userSummary = await getProductSummary(Object.values(productsMain), Object.values(productsAdditional), userData);

  const surveyResults: SurveyResults = {
    text: userSummary,
    productsMain: productsMain,
    productsAdditional: productsAdditional,
  };

  return surveyResults;
}

async function searchProductsByPrompt(prompt: string, categories: string[]): Promise<Product[]> {
  const client = await connectToWeaviate();
  const products = client.collections.get(collectionName);

  const result = await products.query.hybrid(prompt, {
    limit: 1,
    filters: Filters.or(...categories.map(category => products.filter.byProperty("category").equal(category))),
  });

  const product_results: Product[] = result.objects.map(
    (item) => item.properties as unknown as Product,
  );
  return product_results || [];
}

async function getProductSummary(productsMain: Product[], productsAdditional: Product[], userData: UserData) {


  return "Here's your summary"
}

async function executeAggregation(searchRequest: SearchRequest) {
  const client = await connectToWeaviate();
  const products = client.collections.get(collectionName);

  const aggs = {
    "category": products.metrics.aggregate('category').text(['topOccurrencesValue', 'topOccurrencesOccurs'], 10),
    "brand_name": products.metrics.aggregate('brand_name').text(['topOccurrencesValue', 'topOccurrencesOccurs'], 10),
    "sell_price": products.metrics.aggregate('sell_price').integer(['maximum', 'minimum']),
    "average_score_percentage": products.metrics.aggregate('average_score_percentage').integer(['maximum', 'minimum']),
    "ingredient_groups": products.metrics.aggregate('ingredient_groups').text(['topOccurrencesValue', 'topOccurrencesOccurs'], 10),
  }

  let result;
  if (searchRequest.query != "") {
    result = await products.aggregate.nearText(searchRequest.query, {
      returnMetrics: Object.values(aggs)
    })
  } else {
    result = await products.aggregate.overAll({
      returnMetrics: Object.values(aggs)
    })
  }

  console.log(result)
  return result
}