import { SurveyQuestion } from "@/types/surveyQuestions";
import { Product, Review } from "@/types/products";

export const questions: SurveyQuestion[] = [
  {
    id: 1,
    question: "What's your skin tone?",
    options: ["Light", "Medium", "Dark"],
    type: "RANGE",
  },
  {
    id: 2,
    question: "What's your skin type?",
    options: ["Dry", "Normal", "Oily"],
    type: "RANGE",
  },
  {
    id: 3,
    question: "What gender do you identify with?",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
    type: "SINGLE",
  },
  {
    id: 4,
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
    id: 5,
    question: "Do you have any of these additional concerns?",
    options: [
      "Dryness",
      "Oiliness",
      "Puffy eyes",
      "Dark circles",
      "Sagging skin",
    ],
    type: "MULTI",
  },
  {
    id: 6,
    question: "What is your age?",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
    type: "SINGLE",
  },
  {
    id: 7,
    question: "Do you have sensitive skin?",
    options: ["Yes", "No", "Unsure"],
    type: "SINGLE",
  },
];

export const dummyProduct: Product = {
  id: "1111111111",
  name: "Product 1",
  description: "Product 1 description",
  price: 100,
  image:
    "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
  category: "Category 1",
  brand: "Brand 1",
  rating: 4.5,
  reviews: ["Review 1", "Review 2", "Review 3"],
  reviewsCount: 200,
  ingredients: "Ingredients 1",
};

export const recommendedProducts: Product[] = [
  {
    id: "1111111111",
    name: "Recommended Product 1",
    description: "Recommended Product 1 description",
    price: 100,
    image:
      "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
    category: "Category 1",
    brand: "Brand 1",
    rating: 4.5,
    reviews: ["Review 1", "Review 2", "Review 3"],
    reviewsCount: 200,
    ingredients: "Ingredients 1",
  }, 
  {
    id: "2222222222",
    name: "Recommended Product 2",
    description: "Recommended Product 2 description",
    price: 100,
    image:
      "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
    category: "Category 1",
    brand: "Brand 1",
    rating: 4.5,
    reviews: ["Review 1", "Review 2", "Review 3"],
    reviewsCount: 200,
    ingredients: "Ingredients 1",
  }, 
  {
    id: "3333333333",
    name: "Recommended Product 3",
    description: "Recommended Product 3 description",
    price: 100,
    image:
      "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
    category: "Category 1",
    brand: "Brand 1",
    rating: 4.5,
    reviews: ["Review 1", "Review 2", "Review 3"],
    reviewsCount: 200,
    ingredients: "Ingredients 1",
  },
  {
    id: "4444444444",
    name: "Recommended Product 4",
    description: "Recommended Product 4 description",
    price: 100,
    image:
      "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
    category: "Category 1",
    brand: "Brand 1",
    rating: 4.5,
    reviews: ["Review 1", "Review 2", "Review 3"],
    reviewsCount: 200,
    ingredients: "Ingredients 1",
  },
  {
    id: "5555555555",
    name: "Recommended Product 5",
    description: "Recommended Product 5 description",
    price: 100,
    image:
      "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
    category: "Category 1",
    brand: "Brand 1",
    rating: 4.5,
    reviews: ["Review 1", "Review 2", "Review 3"],
    reviewsCount: 200,
    ingredients: "Ingredients 1",
  },
];

export const dummyReviews: Review[] = [
  {
    id: "1111111111",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 1",
    author: "Author 1",
    date: "2024-01-01",
  },
  {
    id: "2222222222",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 2",
    author: "Author 2",
    date: "2024-01-01",
  },
  {
    id: "3333333333",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 3",
    author: "Author 3",
    date: "2024-01-01",
    img: "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
  },
  {
    id: "4444444444",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 4",
    author: "Author 4",
    date: "2024-01-01",
    img: "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
  },
  {
    id: "5555555555",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 5",
    author: "Author 5",
    date: "2024-01-01",
  },
  {
    id: "6666666666",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    title: "Review 6",
    author: "Author 6",
    date: "2024-01-01",
  },
];

export const stackProducts = [
  {
    id: "1111111111",
    name: "Product 1",
    price: 100,
    description: "Description 1",
  },
  {
    id: "2222222222",
    name: "Product 2",
    price: 200,
    description: "Description 2",
  },
  {
    id: "3333333333",
    name: "Product 3",
    price: 300,
    description: "Description 3",
  },
];