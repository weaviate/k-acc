import { SurveyQuestion } from "@/types/survey";
import { Product, Review } from "@/types/products";
import { Filter } from "@/types/search";

export const questions: SurveyQuestion[] = [
  {
    question_id: 1,
    question: "What's your skin tone?",
    options: ["Light", "Medium", "Dark"],
    type: "RANGE",
  },
  {
    question_id: 2,
    question: "What's your skin type?",
    options: ["Dry", "Normal", "Oily"],
    type: "RANGE",
  },
  {
    question_id: 3,
    question: "What are your skin goals?",
    options: ["Glowing Skin", "Firmness", "Hydration", "Repairing Skin", "Soothing", "Protection"],
    type: "MULTI",
  },
  {
    question_id: 4,
    question: "What are your skin concerns?",
    options: [
      "Acne",
      "Pores",
      "Redness",
      "Texture",
      "Wrinkles",
      "Pigmentation",
    ],
    type: "MULTI",
    icons: true,
  },
  {
    question_id: 5,
    question: "Do you have any of these additional concerns?",
    options: [
      "Dryness",
      "Oiliness",
      "Puffy eyes",
      "Dark circles",
      "Sagging skin",
    ],
    type: "MULTI",
    icons: true,
  },
  {
    question_id: 6,
    question: "What is your age?",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
    type: "SINGLE",
  },
  {
    question_id: 7,
    question: "Do you have sensitive skin?",
    options: ["Yes", "No", "Unsure"],
    type: "SINGLE",
  },
];

export const dummyReviews: Review[] = [
  {
    id: "1111111111",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 1",
    author: "Author 1",
    date: "2024-01-01",
  },
  {
    id: "2222222222",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 2",
    author: "Author 2",
    date: "2024-01-01",
  },
  {
    id: "3333333333",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 3",
    author: "Author 3",
    date: "2024-01-01",
    img: "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
  },
  {
    id: "4444444444",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 4",
    author: "Author 4",
    date: "2024-01-01",
    img: "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
  },
  {
    id: "5555555555",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 5",
    author: "Author 5",
    date: "2024-01-01",
  },
  {
    id: "6666666666",
    rating: 4.5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 6",
    author: "Author 6",
    date: "2024-01-01",
  },
];

export const stackProducts = [
  {
    product_id: "1111111111",
    name: "Product 1",
    price: 100,
    description: "Description 1",
  },
  {
    product_id: "2222222222",
    name: "Product 2",
    price: 200,
    description: "Description 2",
  },
  {
    product_id: "3333333333",
    name: "Product 3",
    price: 300,
    description: "Description 3",
  },
];

export const filterProps: Filter[] = [
  {
    name: "category",
    type: "MULTI",
  },
  {
    name: "brand_name",
    type: "SINGLE",
  },
  {
    name: "sell_price",
    type: "RANGE",
  },
  {
    name: "average_score_percentage",
    type: "RANGE",
  },
  {
    name: "ingredient_groups",
    type: "MULTI",
  },
];
