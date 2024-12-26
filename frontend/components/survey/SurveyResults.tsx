import React from "react";
import { useRouter } from "next/navigation";
import { SurveyQuestion } from "@/types/surveyQuestions";

interface SurveyResultsProps {
    answers: Record<string, string | string[]>;
    onReset: () => void;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({
    answers,
    onReset
}) => {
    const router = useRouter();

    const handleReset = () => {
        onReset();
        router.push('/survey?q=0');
    };

    return (
        <div className="min-h-screen relative p-6">
            <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto pt-20">
                <h1 className="text-2xl text-primary text-center font-outfit">
                    Survey Results
                </h1>
                {/* Display your results here */}
                <button
                    onClick={handleReset}
                    className="btn btn-primary mt-8"
                >
                    Take Survey Again
                </button>
            </div>
        </div>
    );
};

export default SurveyResults;