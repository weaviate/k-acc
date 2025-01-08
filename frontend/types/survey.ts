import { Product } from "./products";

export interface SurveyQuestion {
  question_id: number;
  question: string;
  options: string[];
  type: "MULTI" | "SINGLE" | "RANGE";
  icons?: boolean;
}

export interface SurveyAnswer {
  question_id: number;
  selected_options: any[];
}

export interface SurveyAnswers {
  answers: SurveyAnswer[];
}

export interface SurveyResults {
  text: string;
  productsMain: Product[];
  productsAdditional: Product[];
}

export interface UserData {
  skinTone: string;
  skinType: string;
  goals: string[];
  concerns: string[];
  age: string;
  sensitive: boolean;
}