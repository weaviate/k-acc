export interface Product {
  product_id: string;
  name: string;
  category: string;
  image_url: string;
  brand_country: string;
  brand_name: string;
  brand_id: number;
  brand_about: string;
  sell_price: number;
  list_price: number;
  discount_percentage: number;
  discount_label: string;
  review_count: number;
  average_score_percentage: number;
  major_ingredients: string;
  ingredient_group_details: object[];
  ingredient_groups: string[];
  product_url: string;
  professional_review: string;
  gallery_description: string;
  is_new: boolean;
  is_must_try: boolean;
  is_most_popular: boolean;
  is_limited_deal: boolean;
  is_eco_friendly: boolean;
  product_data_review_analysis: object[];
}

export const emptyProduct: Product = {
  product_id: "",
  name: "",
  category: "",
  image_url: "",
  brand_country: "",
  brand_name: "",
  brand_id: 0,
  brand_about: "",
  sell_price: 0,
  list_price: 0,
  discount_percentage: 0,
  discount_label: "",
  review_count: 0,
  average_score_percentage: 0,
  major_ingredients: "",
  ingredient_group_details: [],
  ingredient_groups: [],
  product_url: "",
  professional_review: "",
  gallery_description: "",
  is_new: false,
  is_must_try: false,
  is_most_popular: false,
  is_limited_deal: false,
  is_eco_friendly: false,
  product_data_review_analysis: [],
};

export interface Review {
  id: string;
  rating: number;
  comment: string;
  title: string;
  author: string;
  date: string;
  img?: string;
}
