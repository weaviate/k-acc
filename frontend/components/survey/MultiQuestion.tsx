import React, { useState } from "react";
import { SurveyQuestion } from "@/types/surveyQuestions";

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
    existingAnswers
}) => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(existingAnswers || []);

    return (
        <div className="min-h-screen relative p-6">
            <button
                onClick={onBack}
                className="absolute top-3 -left-10 text-primary hover:opacity-50"
            >
                ← Back
            </button>
            <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto pt-10">
                <h1 className="text-2xl text-primary text-center font-outfit">
                    {question.question}
                </h1>
                <div className="flex flex-col w-full gap-4">
                    {question.options?.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                if (selectedAnswers.includes(option)) {
                                    setSelectedAnswers(selectedAnswers.filter(answer => answer !== option));
                                } else {
                                    setSelectedAnswers([...selectedAnswers, option]);
                                }
                            }}
                            className={`btn btn-secondary hover:bg-accent/10
                                ${selectedAnswers.includes(option)
                                    ? 'border-accent bg-accent/10'
                                    : ''}`}
                        >
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
}

export default MultiQuestion;