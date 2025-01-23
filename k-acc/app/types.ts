import {
  GlowingIcon,
  PigmentIcon,
  PoresIcon,
  ProtectionIcon,
  RednessIcon,
  RepairIcon,
  SoothingIcon,
  TextureIcon,
  WrinkleIcon,
  AcneIcon,
} from "./components/icons";

import { HydrationIcon } from "./components/icons";

import { FirmnessIcon } from "./components/icons";

export type Question = {
  id: string;
  question: string;
  subtitle: string;
  type: "multi" | "single" | "slider";
  options: MultiSelectQuestion | SingleQuestion | SliderQuestion;
};

export type MultiSelectQuestion = {
  selected: string[];
  options: MultiOption[];
};

export type MultiOption = {
  name: string;
  icon: typeof GlowingIcon;
  color: string;
};

export type SingleQuestion = {
  selected: string;
  options: MultiOption[];
};

export type SliderQuestion = {
  min: number;
  max: number;
  defaultValue: number;
  selected: number;
  step: number;
  colors: string[];
  minLabel: string;
  maxLabel: string;
  selectedLabel: string;
};

// ------------------------------------------------------------

export type Questionnaire = Question[];

export const SkinToneQuestion: Question = {
  id: "skintone",
  question: "What is your skin tone?",
  subtitle: "(Fitzpatrick skin phototype)",
  type: "slider",
  options: {
    defaultValue: 2,
    selected: 2,
    selectedLabel: "FST",
    min: 1,
    minLabel: "FST 1",
    max: 6,
    maxLabel: "FST 6",
    step: 1,
    colors: ["bg-FST1", "bg-FST2", "bg-FST3", "bg-FST4", "bg-FST5", "bg-FST6"],
  },
};

export const AgeQuestion: Question = {
  id: "age",
  question: "What is your age?",
  subtitle: "",
  type: "slider",
  options: {
    defaultValue: 25,
    selected: 25,
    selectedLabel: "Age",
    min: 18,
    minLabel: ">18",
    max: 80,
    maxLabel: "+80",
    step: 1,
    colors: [],
  },
};

export const DrySkinQuestion: Question = {
  id: "skintype",
  question: "What is your skin type?",
  subtitle: "",
  type: "slider",
  options: {
    defaultValue: 5,
    selected: 5,
    selectedLabel: "",
    min: 0,
    minLabel: "Dry",
    max: 10,
    maxLabel: "Oily",
    step: 1,
    colors: [],
  },
};

export const SkinGoalsQuestion: Question = {
  id: "goals",
  question: "What are your skin goals?",
  subtitle: "Select multiple options",
  type: "multi",
  options: {
    selected: [],
    options: [
      { name: "Firmness", icon: FirmnessIcon, color: "" },
      { name: "Hydration", icon: HydrationIcon, color: "" },
      { name: "Glowing Skin", icon: GlowingIcon, color: "" },
      { name: "Skin Repair", icon: RepairIcon, color: "" },
      { name: "Protection", icon: ProtectionIcon, color: "" },
      { name: "Soothing Skin", icon: SoothingIcon, color: "" },
    ],
  },
};

export const ConditionsQuestion: Question = {
  id: "conditions",
  question: "Do you have any skin conditions?",
  subtitle: "Select multiple options",
  type: "multi",
  options: {
    selected: [],
    options: [
      { name: "Acne", icon: AcneIcon, color: "" },
      { name: "Clogged Pores", icon: PoresIcon, color: "" },
      { name: "Redness", icon: RednessIcon, color: "" },
      { name: "Wrinkles", icon: WrinkleIcon, color: "" },
      { name: "Pigmentation", icon: PigmentIcon, color: "" },
      { name: "Rough Texture", icon: TextureIcon, color: "" },
    ],
  },
};

export const ConcernsQuestion: Question = {
  id: "concerns",
  question: "Any additional concerns?",
  subtitle: "Select multiple options",
  type: "multi",
  options: {
    selected: [],
    options: [
      { name: "Blackheads", icon: "", color: "" },
      { name: "Dryness", icon: "", color: "" },
      { name: "Puffy eyes", icon: "", color: "" },
      { name: "Oilyness", icon: "", color: "" },
      { name: "Sagging skin", icon: "", color: "" },
      { name: "Dark circles", icon: "", color: "" },
    ],
  },
};

export const QuestionsCollection: Questionnaire = [
  SkinGoalsQuestion,
  DrySkinQuestion,
  SkinToneQuestion,
  ConditionsQuestion,
  ConcernsQuestion,
  AgeQuestion,
];
