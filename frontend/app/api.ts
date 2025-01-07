"use server";

import { SearchRequest } from "@/types/search";
import { Product, emptyProduct } from "@/types/products";
import weaviate, { WeaviateClient } from "weaviate-client";

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

// Verify collection exists
async function checkCollection() {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");
  const collectionConfig = await products.config.get();
  console.log("Config collection: ", collectionConfig);
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
  console.log("getProduct: ", productId);
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  const result = await products.query.fetchObjects({
    filters: products.filter.byProperty("product_id").equal(productId),
    limit: 1,
  });

  for (let object of result.objects) {
    console.log(JSON.stringify(object.properties, null, 2));
  }

  return (result.objects[0]?.properties as unknown as Product) || emptyProduct;
}

export async function searchProducts(searchRequest: SearchRequest) {
  const client = await connectToWeaviate();
  const products = client.collections.get("ProductData");

  let result;
  if (searchRequest.query !== "") {
    result = await products.query.nearText(searchRequest.query, {
      limit: 2,
    });
  } else {
    result = await products.query.fetchObjects({
      limit: 12,
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
