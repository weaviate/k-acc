export type WeaviateProduct = {
  pid: string;
  name: string;
  brand: string;
  bid: string;
  brand_about: string;
  category: string;
  image: string;
  price: number;
  review_count: number;
  score_percentage: number;
  ingredients: string;
  ingredient_groups: string[];
  url: string;
  description: string;
  positive_effects: Effect[];
  negative_effects: Effect[];
};

export type Product = {
  pid: string;
  name: string;
  brand: string;
  bid: string;
  brand_about: string;
  category: string;
  image: string;
  image_xl: string;
  image_xxl: string;
  price: number;
  review_count: number;
  score_percentage: number;
  ingredients: string[];
  ingredient_groups: string[];
  url: string;
  description: string;
  positive_effects: Effect[];
  negative_effects: Effect[];
  uuid: string;
  explanation: string;
};

export type Details = {
  id: string;
  name: string;
  ingredients: string;
};

export type Effect = {
  name: string;
  count: number;
  percentage: number;
  aliases: string[];
};

export type Stack = {
  cleanser: Product | null;
  moisturizer: Product | null;
  sunscreen: Product | null;
};

export type StackPayload = {
  stack: Stack;
  description: string;
};
