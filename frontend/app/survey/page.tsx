'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SurveyQuestion } from '@/types/surveyQuestions';

import MultiQuestion from '@/components/survey/MultiQuestion';
import SingleQuestion from '@/components/survey/SingleQuestion';
import RangeQuestion from '@/components/survey/RangeQuestion';
import ProgressBar from '@/components/survey/ProgressBar';
import SurveyResults from '@/components/survey/SurveyResults';

const questions: SurveyQuestion[] = [
    {
        id: 1,
        question: "What's your skin tone?",
        options: ["Light", "Medium", "Dark"],
        type: "RANGE"
    },
    {
        id: 2,
        question: "What's your skin type?",
        options: ["Dry", "Normal","Oily"],
        type: "RANGE"
    },
    {
        id: 3,
        question: "What gender do you identify with?",
        options: ["Male", "Female", "Non-binary", "Prefer not to say"],
        type: "SINGLE"
    },
    {
        id: 4,
        question: "What are your skin concerns?",
        options: ["Acne", "Pores", "Redness", "Texture", "Wrinkles", "Pigmentation"],
        type: "MULTI",
        icons: true
    },
    {
        id: 5,
        question: "Do you have any of these additional concerns?",
        options: ["Dryness", "Oiliness", "Puffy eyes", "Dark circles", "Sagging skin"],
        type: "MULTI"
    },
    {
        id: 6,
        question: "What is your age?",
        options: ["18-24", "25-34", "35-44", "45-54", "55+"],
        type: "SINGLE"
    },
    {
        id: 7,
        question: "Do you have sensitive skin?",
        options: ["Yes", "No", "Unsure"],
        type: "SINGLE"
    },
];

export default function SurveyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string[]>>({});

    useEffect(() => {
        const questionId = parseInt(searchParams.get('q') || '0');
        setCurrentQuestionId(questionId);
        setMounted(true);
    }, [searchParams]);

    if (!mounted) {
        return null;
    }

    const currentQuestion = questions.find(q => q.id === currentQuestionId);

    const handleNext = (answer: string | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestionId]: Array.isArray(answer) ? answer : [answer]
        }));

        if (currentQuestionId < questions.length) {
            router.push(`/survey?q=${currentQuestionId + 1}`);
        } else {
            setCurrentQuestionId(questions.length + 1);
            router.push(`/survey?q=${currentQuestionId}`);
        }
    };

    const handleReset = () => {
        setAnswers({});
        setCurrentQuestionId(0);
    };

    return (
        <div className="min-h-screen place-items-center pt-10">
            <ProgressBar questions={questions} currentQuestion={currentQuestionId} />
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-xl w-full grid"
                >
                    {(currentQuestionId === 0) && (
                        <div>
                            <h1 className="text-2xl my-8 text-primary">Welcome to the survey!</h1>
                            <button className="btn btn-primary" onClick={() => handleNext("")}>Start</button>
                        </div>
                    )}
                    {currentQuestion?.type === "MULTI" && (
                        <MultiQuestion
                            question={currentQuestion}
                            onBack={() => router.push(`/survey?q=${currentQuestionId - 1}`)}
                            onNext={handleNext}
                            existingAnswers={answers[currentQuestionId]}
                        />
                    )}
                    {currentQuestion?.type === "SINGLE" && (
                        <SingleQuestion
                            question={currentQuestion}
                            onBack={() => router.push(`/survey?q=${currentQuestionId - 1}`)}
                            onNext={handleNext}
                            existingAnswer={answers[currentQuestionId]?.[0]}
                        />
                    )}
                    {currentQuestion?.type === "RANGE" && (
                        <RangeQuestion
                            question={currentQuestion}
                            onBack={() => router.push(`/survey?q=${currentQuestionId - 1}`)}
                            onNext={handleNext}
                            existingAnswer={answers[currentQuestionId]?.[0]}
                        />
                    )}
                    {currentQuestionId > questions.length && (
                        <SurveyResults 
                            answers={answers}
                            onReset={handleReset}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
