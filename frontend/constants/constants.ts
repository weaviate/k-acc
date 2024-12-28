import { SurveyQuestion } from "@/types/surveyQuestions";

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
