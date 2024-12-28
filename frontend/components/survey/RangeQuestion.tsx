import React, { useState } from "react";
import { SurveyQuestion } from "@/types/surveyQuestions";

interface RangeQuestionProps {
  question: SurveyQuestion;
  onBack: () => void;
  onNext: (answer: string) => void;
  existingAnswer?: string;
}

const RangeQuestion: React.FC<RangeQuestionProps> = ({
  question,
  onBack,
  onNext,
  existingAnswer,
}) => {
  const [value, setValue] = useState<number>(
    existingAnswer ? parseInt(existingAnswer) : 3,
  );

  // Assuming options contains the min and max labels (e.g., ["Not at all", "Very much"])
  const [minLabel, midLabel, maxLabel] = question.options;

  return (
    <div className="min-h-screen relative p-6 mt-10 lg:mt-0">
      <button
        onClick={onBack}
        className="absolute top-3 left-2 lg:-left-5 text-primary hover:opacity-50"
      >
        ← Back
      </button>
      <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto pt-10">
        <h1 className="text-2xl text-primary text-center font-outfit">
          {question.question}
        </h1>
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-600">{minLabel}</span>
            <input
              type="range"
              min={1}
              max={5}
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="range range-accent bg-accent flex-1"
              step={1}
            />
            <span className="font-medium text-gray-600">{maxLabel}</span>
          </div>
          <div className="w-full flex justify-between text-primary/50 text-xs lg:text-sm mt-4 px-7">
            <span>Very {minLabel}</span>
            <span>A little {minLabel}</span>
            <span>{midLabel}</span>
            <span>A little {maxLabel}</span>
            <span>Very {maxLabel}</span>
          </div>
        </div>
        <button
          onClick={() => onNext(value.toString())}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RangeQuestion;
