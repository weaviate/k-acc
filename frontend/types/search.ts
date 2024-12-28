import { emptyProduct, Product } from "./products";

export interface SearchRequest {
  query: string;
}

export interface SearchResponse {
  products: Product[];
}

export const dummySearchRequest: SearchRequest = {
  query: "",
};

export const emptySearchResponse: SearchResponse = {
  products: [],
};
