import React, { useState } from "react";
import { SurveyQuestion } from "@/types/surveyQuestions";

interface ProgressBarProps {
    questions: SurveyQuestion[];
    currentQuestion: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    questions,
    currentQuestion
}) => {
    // Don't render anything if we're not at question ID 1
    if (currentQuestion === 0) {
        return null;
    }

    return (    
        <div className="max-w-xl w-full flex justify-center mb-5">
            <ul className="steps steps-vertical lg:steps-horizontal">
                {questions.map((question, index) => (
                    <li key={question.id} className={`step ${index <= currentQuestion-1 ? 'before:!bg-accent after:!bg-accent' : 'before:!bg-secondary after:!bg-secondary'}`}></li>
                ))}
            </ul>
        </div>
    )
}

export default ProgressBar;