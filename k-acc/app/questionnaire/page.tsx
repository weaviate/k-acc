"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IoCaretBack, IoLogIn, IoSparklesSharp, IoMenu } from "react-icons/io5";
import { RouterContext } from "../components/useRouter";
import { useContext, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Question,
  Questionnaire,
  QuestionsCollection,
  SliderQuestion,
  MultiSelectQuestion,
  MultiOption,
} from "../types";
import SkinToneSlider from "./skintone-slider";
import AgeSlider from "./age-slider";
import { IoHome } from "react-icons/io5";
import SkinTypeSlider from "./skintype-slider";
import MultiSelect from "./multi-select";
export default function QuestionnairePage() {
  const { routeTo } = useContext(RouterContext);

  const [questions, setQuestions] =
    useState<Questionnaire>(QuestionsCollection);

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const handleSliderChange = (value: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[currentQuestion].options.selected = value;
      return newQuestions;
    });
  };

  const triggerOption = (option: MultiOption) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q, index) => {
        // Only modify the currentQuestion; otherwise return the original
        if (index !== currentQuestion) {
          return q;
        }

        // Make a copy of the question so it’s a new reference
        const multiSelectOptions = q.options as MultiSelectQuestion;

        // `selected` should be a new array (so React sees a change)
        const isSelected = multiSelectOptions.selected.includes(option.name);
        const newSelected = isSelected
          ? multiSelectOptions.selected.filter((item) => item !== option.name)
          : [...multiSelectOptions.selected, option.name];

        return {
          ...q,
          options: {
            ...multiSelectOptions,
            selected: newSelected,
          },
        };
      });
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  useEffect(() => {
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion]);

  return (
    <div className="flex flex-col items-center justify-between h-full gap-4 fade-in ">
      {/** Header */}
      <div className="flex flex-col items-center justify-start w-full gap-4">
        <div className="flex flex-row items-center justify-between gap-2 w-full">
          {currentQuestion > 0 ? (
            <Button
              size="icon"
              disabled={currentQuestion === 0}
              variant="outline"
              onClick={previousQuestion}
            >
              <IoCaretBack size={24} />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="outline"
              onClick={() => routeTo("/welcome")}
            >
              <IoHome size={24} />
            </Button>
          )}
          <Progress value={progress} className="w-2/3" />
          <Sheet>
            <SheetTrigger>
              <IoMenu size={24} />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-center justify-center gap-2">
              <SheetHeader>
                <SheetTitle>glowyou</SheetTitle>
              </SheetHeader>
              <div className="flex flex-grow flex-col w-full items-center justify-end gap-2">
                <Button
                  size="lg"
                  variant="glass"
                  className="w-full"
                  onClick={() => routeTo("/login")}
                >
                  Log in
                </Button>
                <Button
                  size="lg"
                  variant="glass"
                  className="w-full"
                  onClick={() => routeTo("/signup")}
                >
                  Sign up
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-col items-center justify-start w-full">
          <p className="text-primary font-medium text-xl">
            {questions[currentQuestion].question}
          </p>
          <p className="text-primary font-light text-sm">
            {questions[currentQuestion].subtitle}
          </p>
        </div>
      </div>
      {questions[currentQuestion].type === "slider" &&
        questions[currentQuestion].id === "skintone" && (
          <SkinToneSlider
            min={(questions[currentQuestion].options as SliderQuestion).min}
            max={(questions[currentQuestion].options as SliderQuestion).max}
            step={(questions[currentQuestion].options as SliderQuestion).step}
            colors={
              (questions[currentQuestion].options as SliderQuestion).colors ||
              []
            }
            minLabel={
              (questions[currentQuestion].options as SliderQuestion).minLabel ||
              "Min"
            }
            maxLabel={
              (questions[currentQuestion].options as SliderQuestion).maxLabel ||
              "Max"
            }
            selectedLabel={
              (questions[currentQuestion].options as SliderQuestion)
                .selectedLabel || "Selected"
            }
            value={
              (questions[currentQuestion].options as SliderQuestion).selected
            }
            onChange={handleSliderChange}
          />
        )}
      {questions[currentQuestion].type === "slider" &&
        questions[currentQuestion].id === "age" && (
          <AgeSlider
            min={(questions[currentQuestion].options as SliderQuestion).min}
            max={(questions[currentQuestion].options as SliderQuestion).max}
            step={(questions[currentQuestion].options as SliderQuestion).step}
            colors={
              (questions[currentQuestion].options as SliderQuestion).colors ||
              []
            }
            minLabel={
              (questions[currentQuestion].options as SliderQuestion).minLabel ||
              "Min"
            }
            maxLabel={
              (questions[currentQuestion].options as SliderQuestion).maxLabel ||
              "Max"
            }
            selectedLabel={
              (questions[currentQuestion].options as SliderQuestion)
                .selectedLabel || "Selected"
            }
            value={
              (questions[currentQuestion].options as SliderQuestion).selected
            }
            onChange={handleSliderChange}
          />
        )}
      {questions[currentQuestion].type === "slider" &&
        questions[currentQuestion].id === "skintype" && (
          <SkinTypeSlider
            min={(questions[currentQuestion].options as SliderQuestion).min}
            max={(questions[currentQuestion].options as SliderQuestion).max}
            step={(questions[currentQuestion].options as SliderQuestion).step}
            colors={
              (questions[currentQuestion].options as SliderQuestion).colors ||
              []
            }
            minLabel={
              (questions[currentQuestion].options as SliderQuestion).minLabel ||
              "Min"
            }
            maxLabel={
              (questions[currentQuestion].options as SliderQuestion).maxLabel ||
              "Max"
            }
            selectedLabel={
              (questions[currentQuestion].options as SliderQuestion)
                .selectedLabel || "Selected"
            }
            value={
              (questions[currentQuestion].options as SliderQuestion).selected
            }
            onChange={handleSliderChange}
          />
        )}
      {questions[currentQuestion].type === "multi" && (
        <MultiSelect
          options={
            (questions[currentQuestion].options as MultiSelectQuestion).options
          }
          selected={
            (questions[currentQuestion].options as MultiSelectQuestion).selected
          }
          triggerOption={triggerOption}
        />
      )}
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <Button
          size="xl"
          variant="glass"
          className="min-w-[300px]"
          onClick={nextQuestion}
        >
          Next Question
        </Button>
      </div>
    </div>
  );
}
