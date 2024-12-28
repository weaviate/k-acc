import React, { useState } from "react";
import { SurveyQuestion } from "@/types/surveyQuestions";
import Image from "next/image";

interface MultiQuestionProps {
  question: SurveyQuestion;
  onBack: () => void;
  onNext: (answers: string[]) => void;
  existingAnswers?: string[];
}

const MultiQuestion: React.FC<MultiQuestionProps> = ({
  question,
  onBack,
  onNext,
  existingAnswers,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    existingAnswers || [],
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
                  setSelectedAnswers([...selectedAnswers, option]);
                }
              }}
              className={`btn btn-secondary h-24 hover:bg-accent/10 flex flex-col items-center justify-center
                                ${
                                  selectedAnswers.includes(option)
                                    ? "border-accent bg-accent/10"
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
