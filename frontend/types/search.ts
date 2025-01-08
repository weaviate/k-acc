import { Product } from "./products";

export interface SearchRequest {
  query: string;
  size: number;
  page: number;
  filters: Filter[];
}


export interface SearchResponse {
  products: Product[];
}

export const emptySearchResponse: SearchResponse = {
  products: [],
};

export interface Filter {
  name: string;
  type: "MULTI" | "SINGLE" | "RANGE";
  value?: string;
  values?: string[];
  min?: number;
  max?: number;
}
