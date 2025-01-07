export interface SurveyQuestion {
  question_id: number;
  question: string;
  options: string[];
  type: "MULTI" | "SINGLE" | "RANGE";
  icons?: boolean;
}
