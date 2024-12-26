export interface SurveyQuestion {
    id: number;
    question: string;
    options: string[];
    type: "MULTI" | "SINGLE" | "RANGE";
    icons?: boolean;
}
