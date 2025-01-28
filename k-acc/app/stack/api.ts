"use server";

import weaviate, { Collection, WeaviateClient } from "weaviate-client";
import { Effects, skinTypeMapping, UserInformation } from "../types";

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_API_KEY as string;

const createClient = async (): Promise<WeaviateClient> => {
  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
    weaviateURL,
    {
      authCredentials: new weaviate.ApiKey(weaviateKey),
    }
  );
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

export async function getStack(userInformation: UserInformation) {
  const client = await createClient();
  const collection = await client.collections.get("Products");
  getCleanser(userInformation, collection);
}

const getCleanser = async (
  userInformation: UserInformation,
  collection: Collection
) => {
  const query = generateQuery("Cleanser", userInformation);

  console.log(query);
};
