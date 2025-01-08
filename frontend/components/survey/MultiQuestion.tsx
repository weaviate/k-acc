import React, { useState } from "react";
import { SurveyAnswer, SurveyQuestion } from "@/types/survey";
import Image from "next/image";

interface MultiQuestionProps {
  question: SurveyQuestion;
  onBack: () => void;
  onNext: (answers: string[]) => void;
  existingAnswers?: SurveyAnswer;
}

const MultiQuestion: React.FC<MultiQuestionProps> = ({
  question,
  onBack,
  onNext,
  existingAnswers,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    existingAnswers?.selected_options || [],
  );

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
        <p className="text-xs text-gray-500 text-center">
          Please select up to 2 options
        </p>
        <div className="grid grid-cols-2 w-3/4 gap-4">
          {question.options?.map((option) => (
            <button
              key={option}
              onClick={() => {
                if (selectedAnswers.includes(option)) {
                  setSelectedAnswers(
                    selectedAnswers.filter((answer) => answer !== option),
                  );
                } else {
                  if (selectedAnswers.length < 2) {
                    setSelectedAnswers([...selectedAnswers, option]);
                  }
                }
              }}
              className={`btn btn-secondary h-24 hover:bg-accent/10 flex flex-col items-center justify-center
                                ${
                                  selectedAnswers.includes(option)
                                    ? "border-accent bg-accent/10"
                                    : ""
                                }
                                ${
                                  !selectedAnswers.includes(option) && selectedAnswers.length >= 2
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
            >
              {question.icons && (
                <Image
                  src={`/icons/${option.toLowerCase().replace(" ", "_")}.svg`}
                  alt={option}
                  width={20}
                  height={20}
                  className="w-10 h-10 mb-2"
                />
              )}
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={() => onNext(selectedAnswers)}
          disabled={selectedAnswers.length === 0}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiQuestion;
