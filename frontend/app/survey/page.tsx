"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MultiQuestion from "@/components/survey/MultiQuestion";
import SingleQuestion from "@/components/survey/SingleQuestion";
import RangeQuestion from "@/components/survey/RangeQuestion";
import ProgressBar from "@/components/survey/ProgressBar";
import SurveyResults from "@/components/survey/SurveyResults";

import { questions } from "@/constants/constants";
import { SurveyAnswer,SurveyAnswers } from "@/types/survey";
import { getSurveyResults } from "../api";

export default function SurveyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({answers: []});

  useEffect(() => {
    // Check for saved answers when component mounts
    const savedAnswers = localStorage.getItem('surveyAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      // Redirect to results page
      setCurrentQuestionId(questions.length + 1);
      router.push(`/survey?q=${questions.length + 1}`);
    }

    const questionId = parseInt(searchParams.get("q") || "0");
    setCurrentQuestionId(questionId);
    setMounted(true);
  }, [router, searchParams]);

  if (!mounted) {
    return null;
  }

  const currentQuestion = questions.find(
    (q) => q.question_id === currentQuestionId,
  );

  const handleNext = (answer: string | string[]) => {
    setAnswers((prev) => ({
      answers: [...prev.answers, {
        question_id: currentQuestionId,
        selected_options: Array.isArray(answer) ? answer : [answer],
      }],
    }));

    if (currentQuestionId < questions.length) {
      router.push(`/survey?q=${currentQuestionId + 1}`);
    } else {
      setCurrentQuestionId(questions.length + 1);
      router.push(`/survey?q=${currentQuestionId}`);
    }
  };

  const handleReset = () => {
    setAnswers({answers: []});
    setCurrentQuestionId(0);
  };

  return (
    <div className="min-h-screen place-items-center pt-10">
      {currentQuestionId <= questions.length && (
        <ProgressBar questions={questions} currentQuestion={currentQuestionId} />
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:max-w-xl w-full grid"
        >
          {currentQuestionId === 0 && (
            <div className="pl-5 lg:pl-0">
              <h1 className="text-2xl my-8 text-primary">
                Welcome to the survey!
              </h1>
              <button
                className="btn btn-primary"
                onClick={() => handleNext("")}
              >
                Start
              </button>
            </div>
          )}
          {currentQuestion?.type === "MULTI" && (
            <MultiQuestion
              question={currentQuestion}
              onBack={() => router.push(`/survey?q=${currentQuestionId - 1}`)}
              onNext={handleNext}
              existingAnswers={answers.answers[currentQuestionId]}
            />
          )}
          {currentQuestion?.type === "SINGLE" && (
            <SingleQuestion
              question={currentQuestion}
              onBack={() => router.push(`/survey?q=${currentQuestionId - 1}`)}
              onNext={handleNext}
              existingAnswer={answers.answers[currentQuestionId]}
            />
          )}
          {currentQuestion?.type === "RANGE" && (
            <RangeQuestion
              question={currentQuestion}
              onBack={() => router.push(`/survey?q=${currentQuestionId - 1}`)}
              onNext={handleNext}
              existingAnswer={answers.answers[currentQuestionId]}
            />
          )}
          {currentQuestionId > questions.length && (
            <SurveyResults answers={answers} onReset={handleReset} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
