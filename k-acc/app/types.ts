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
  BlackheadIcon,
  DehydrationIcon,
  PuffyIcon,
  OilynessIcon,
  SaggingIcon,
  DarkCircleIcon,
  OilyIcon,
  DryIcon,
  NormalIcon,
} from "./components/icons";

import { HydrationIcon } from "./components/icons";

import { FirmnessIcon } from "./components/icons";

export type Question = {
  id: string;
  explanation: string;
  question: string;
  subtitle: string;
  type: "multi" | "single" | "slider";
  options: MultiSelectQuestion | SingleQuestion | SliderQuestion;
};

export type MultiSelectQuestion = {
  selected: string[];
  effects: Effect[];
};

export type SingleQuestion = {
  selected: string;
  options: string[];
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

export type UserInformation = {
  goals: string[];
  skinType: number;
  skinTone: number;
  conditions: string[];
  age: number;
  sensitive: boolean;
};

// ------------------------------------------------------------

export type Effect = {
  id: string;
  displayName: string;
  description?: string;
  icon: typeof GlowingIcon;
};

export type EffectTable = {
  [key: string]: Effect;
};

export const Effects: EffectTable = {
  Firmness: {
    id: "Firmness",
    displayName: "Firmness",
    icon: FirmnessIcon,
  },
  Hydration: {
    id: "Hydration",
    displayName: "Hydration",
    icon: HydrationIcon,
  },
  Glowing: {
    id: "Glowing",
    displayName: "Glowing Skin",
    icon: GlowingIcon,
  },
  Repair: {
    id: "Repair",
    displayName: "Skin Repair",
    icon: RepairIcon,
  },
  Protection: {
    id: "Protection",
    displayName: "Protection",
    icon: ProtectionIcon,
  },
  Soothing: {
    id: "Soothing",
    displayName: "Soothing Skin",
    icon: SoothingIcon,
  },
  Pigmentation: {
    id: "Pigmentation",
    displayName: "Pigmentation",
    icon: PigmentIcon,
  },
  Texture: {
    id: "Texture",
    displayName: "Rough Texture",
    icon: TextureIcon,
  },
  Wrinkles: {
    id: "Wrinkles",
    displayName: "Wrinkles",
    icon: WrinkleIcon,
  },
  Acne: { id: "Acne", displayName: "Acne", icon: AcneIcon },
  Pores: { id: "Pores", displayName: "Clogged Pores", icon: PoresIcon },
  Redness: { id: "Redness", displayName: "Redness", icon: RednessIcon },
  Blackheads: {
    id: "Blackheads",
    displayName: "Blackheads",
    icon: BlackheadIcon,
  },
  Dehydration: {
    id: "Dehydration",
    displayName: "Dehydration",
    icon: DehydrationIcon,
  },
  Puffy: { id: "Puffy", displayName: "Puffy Eyes", icon: PuffyIcon },
  Oilyness: { id: "Oilyness", displayName: "Oilyness", icon: OilynessIcon },
  Sagging: {
    id: "Sagging",
    displayName: "Sagging Skin",
    icon: SaggingIcon,
  },
  DarkCircle: {
    id: "DarkCircle",
    displayName: "Dark Circles",
    icon: DarkCircleIcon,
  },
  Oily: { id: "Oily", displayName: "Oily Skin", icon: OilyIcon },
  Dry: { id: "Dry", displayName: "Dry Skin", icon: DryIcon },
  Normal: { id: "Normal", displayName: "Normal Skin", icon: NormalIcon },
};

// ------------------------------------------------------------

export type Questionnaire = Question[];

export const SkinToneQuestion: Question = {
  id: "skintone",
  question: "What is your skin tone?",
  explanation:
    "The Fitzpatrick skin phototype scale (FST) is a system for classifying skin color based on the degree of melanin content. It ranges from 1 to 6, with 1 being the lightest and 6 being the darkest.",
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
  explanation:
    "Age is a crucial factor in determining the best skincare products for your skin type. Younger skin is more prone to acne and oilyness, while older skin is more prone to wrinkles and sagging.",
  subtitle: "",
  type: "slider",
  options: {
    defaultValue: 25,
    selected: 25,
    selectedLabel: "Age",
    min: 18,
    minLabel: "18",
    max: 80,
    maxLabel: "80",
    step: 1,
    colors: [],
  },
};

export const DrySkinQuestion: Question = {
  id: "skintype",
  question: "What is your skin type?",
  explanation:
    "Dry skin is characterized by a lack of natural oils, which can lead to flakiness, tightness, and a dull appearance. It is important to choose skincare products that are gentle and moisturizing.",
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
  explanation:
    "Skin goals are the desired outcomes for your skincare routine. They can include improving skin texture, reducing wrinkles, or achieving a more radiant complexion.",
  subtitle: "Select multiple options",
  type: "multi",
  options: {
    selected: [],
    effects: [
      Effects.Firmness,
      Effects.Hydration,
      Effects.Glowing,
      Effects.Repair,
      Effects.Protection,
      Effects.Soothing,
    ],
  },
};

export const ConditionsQuestion: Question = {
  id: "conditions",
  question: "Do you have any skin conditions?",
  explanation:
    "Skin conditions are any abnormalities or issues that affect the skin. They can include acne, clogged pores, redness, wrinkles, pigmentation, and rough texture.",
  subtitle: "Select multiple options",
  type: "multi",
  options: {
    selected: [],
    effects: [
      Effects.Acne,
      Effects.Pores,
      Effects.Redness,
      Effects.Wrinkles,
      Effects.Pigmentation,
      Effects.Texture,
    ],
  },
};

export const ConcernsQuestion: Question = {
  id: "concerns",
  question: "Any additional concerns?",
  explanation:
    "Additional concerns are any specific skin issues or concerns that you may have. They can include blackheads, dehydration, puffy eyes, oilyness, sagging skin, or dark circles.",
  subtitle: "Select multiple options",
  type: "multi",
  options: {
    selected: [],
    effects: [
      Effects.Blackheads,
      Effects.Dehydration,
      Effects.Puffy,
      Effects.Oilyness,
      Effects.Sagging,
      Effects.DarkCircle,
    ],
  },
};

export const SensitiveSkinQuestion: Question = {
  id: "sensitive",
  question: "Do you have sensitive skin?",
  explanation:
    "Sensitive skin is characterized by a high level of sensitivity to external factors, such as fragrances, chemicals, and environmental irritants. It is important to choose skincare products that are gentle and non-irritating.",
  subtitle: "",
  type: "single",
  options: {
    selected: "No",
    options: ["Yes", "No"],
  },
};

export const QuestionsCollection: Questionnaire = [
  SkinGoalsQuestion,
  DrySkinQuestion,
  SkinToneQuestion,
  ConditionsQuestion,
  ConcernsQuestion,
  AgeQuestion,
  SensitiveSkinQuestion,
];

export const skinTypeMapping: {
  [key: number]: [string, string, React.ElementType];
} = {
  0: ["Very Dry", "bg-violet-600", DryIcon],
  1: ["Dry", "bg-violet-500", DryIcon],
  2: ["Dry", "bg-violet-400", DryIcon],
  3: ["Dry", "bg-violet-300", DryIcon],
  4: ["Normal", "bg-green-300", NormalIcon],
  5: ["Normal", "bg-green-200", NormalIcon],
  6: ["Normal", "bg-green-300", NormalIcon],
  7: ["Oily", "bg-orange-300", OilyIcon],
  8: ["Oily", "bg-orange-400", OilyIcon],
  9: ["Very Oily", "bg-orange-500", OilyIcon],
  10: ["Very Oily", "bg-orange-600", OilyIcon],
};
