import React, { useState } from "react";
import { SurveyQuestion } from "@/types/surveyQuestions";
import Image from "next/image";

interface SingleQuestionProps {
    question: SurveyQuestion;
    onBack: () => void;
    onNext: (answer: string) => void;
    existingAnswer?: string;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
    question,
    onBack,
    onNext,
    existingAnswer
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(existingAnswer);

    return (
        <div className="min-h-screen relative p-6">
            <button
                onClick={onBack}
                className="absolute top-3 -left-5 text-primary hover:opacity-50"
            >
                ← Back
            </button>
            <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto pt-10">
                <h1 className="text-2xl text-primary text-center font-outfit">
                    {question.question}
                </h1>
                <div className="flex flex-col w-1/2 gap-4">
                    {question.options?.map((option) => (
                        <button
                            key={option}
                            onClick={() => setSelectedAnswer(selectedAnswer === option ? undefined : option)}
                            className={`btn btn-secondary hover:bg-accent/10 flex items-center gap-2
                                ${selectedAnswer === option
                                    ? 'border-accent bg-accent/10'
                                    : ''}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => onNext(selectedAnswer || '')}
                    disabled={!selectedAnswer}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SingleQuestion;
