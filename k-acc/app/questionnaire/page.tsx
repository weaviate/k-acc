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
  Effect,
  SingleQuestion,
  UserInformation,
} from "../types";
import SkinToneSlider from "./skintone-slider";
import AgeSlider from "./age-slider";
import { IoHome } from "react-icons/io5";
import SkinTypeSlider from "./skintype-slider";
import MultiSelect from "./multi-select";
import SingleSelect from "./single-select";
import { IoSparkles } from "react-icons/io5";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { skinTypeMapping } from "@/app/types";

import { IoInformation } from "react-icons/io5";
import SummaryDisplay from "./summary-display";
import SubMenu from "../components/submenu";
import Navbar from "@/components/ui/navbar";

export default function QuestionnairePage() {
  const { routeTo, updateUserInformation, userInformation } =
    useContext(RouterContext);

  const [summaryMode, setSummaryMode] = useState(false);

  const [questions, setQuestions] =
    useState<Questionnaire>(QuestionsCollection);

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const [currentUserInformation, setCurrentUserInformation] =
    useState<UserInformation | null>(null);

  const convertQuestionsToUserInformation = (questions: Questionnaire) => {
    let goals: string[] = [];
    let skinType: number = 0;
    let skinTone: number = 0;
    let conditions: string[] = [];
    let concerns: string[] = [];
    let age: number = 0;
    let sensitive: boolean = false;

    for (const question of questions) {
      if (question.id === "goals") {
        goals = (question.options as MultiSelectQuestion).effects
          .filter((effect) =>
            (question.options as MultiSelectQuestion).selected.includes(
              effect.id
            )
          )
          .map((effect) => effect.id);
      } else if (question.id === "skintype") {
        skinType = (question.options as SliderQuestion).selected;
      } else if (question.id === "skintone") {
        skinTone = (question.options as SliderQuestion).selected;
      } else if (question.id === "conditions") {
        conditions = (question.options as MultiSelectQuestion).effects
          .filter((effect) =>
            (question.options as MultiSelectQuestion).selected.includes(
              effect.id
            )
          )
          .map((effect) => effect.id);
      } else if (question.id === "concerns") {
        concerns = (question.options as MultiSelectQuestion).effects
          .filter((effect) =>
            (question.options as MultiSelectQuestion).selected.includes(
              effect.id
            )
          )
          .map((effect) => effect.id);
      } else if (question.id === "age") {
        age = (question.options as SliderQuestion).selected;
      } else if (question.id === "sensitive") {
        sensitive = (question.options as SingleQuestion).selected === "Yes";
      }
    }

    const newUserInformation: UserInformation = {
      goals,
      skinType,
      skinTone,
      conditions: [...conditions, ...concerns],
      age,
      sensitive,
    };

    return newUserInformation;
  };

  const triggerConversion = () => {
    setSummaryMode(true);
    const newUserInformation = convertQuestionsToUserInformation(questions);
    setCurrentUserInformation(newUserInformation);
  };

  const handleSliderChange = (value: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[currentQuestion].options.selected = value;
      return newQuestions;
    });
  };

  const triggerOption = (effect: Effect) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q, index) => {
        // Only modify the currentQuestion; otherwise return the original
        if (index !== currentQuestion) {
          return q;
        }

        // Make a copy of the question so it’s a new reference
        const multiSelectOptions = q.options as MultiSelectQuestion;

        // `selected` should be a new array (so React sees a change)
        const isSelected = multiSelectOptions.selected.includes(effect.id);
        const newSelected = isSelected
          ? multiSelectOptions.selected.filter((item) => item !== effect.id)
          : [...multiSelectOptions.selected, effect.id];

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

  const triggerSingleOption = (option: string) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q, index) => {
        // Only modify the currentQuestion; otherwise return the original
        if (index !== currentQuestion) {
          return q;
        }

        // Make a copy of the question so it's a new reference
        const singleQuestion = q.options as SingleQuestion;

        // For single select, just set the selected value to the new option
        return {
          ...q,
          options: {
            ...singleQuestion,
            selected: option,
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
    if (summaryMode) {
      setSummaryMode(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  useEffect(() => {
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion]);

  useEffect(() => {
    if (userInformation) {
      setCurrentUserInformation(userInformation);
    } else {
      console.log("No user information");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full gap-4 fade-in ">
      {/** Header */}
      <div className="flex flex-col items-center justify-start w-full gap-4">
        <Navbar>
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
          {summaryMode ? (
            <p className="text-primary font-bold text-lg">
              Questionnaire Results
            </p>
          ) : (
            <Progress value={progress} className="w-2/3" />
          )}
          <SubMenu />
        </Navbar>
        {!summaryMode && (
          <div className="flex flex-col items-center justify-start w-full gap-1">
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-primary font-medium text-2xl text-center">
                {questions[currentQuestion].question}
              </p>
            </div>
            <p className="text-primary font-light text-lg">
              {questions[currentQuestion].subtitle}
            </p>
          </div>
        )}
      </div>
      {!summaryMode ? (
        <>
          {questions[currentQuestion].type === "slider" &&
            questions[currentQuestion].id === "skintone" && (
              <SkinToneSlider
                min={(questions[currentQuestion].options as SliderQuestion).min}
                max={(questions[currentQuestion].options as SliderQuestion).max}
                step={
                  (questions[currentQuestion].options as SliderQuestion).step
                }
                colors={
                  (questions[currentQuestion].options as SliderQuestion)
                    .colors || []
                }
                minLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .minLabel || "Min"
                }
                maxLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .maxLabel || "Max"
                }
                selectedLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .selectedLabel || "Selected"
                }
                value={
                  (questions[currentQuestion].options as SliderQuestion)
                    .selected
                }
                onChange={handleSliderChange}
              />
            )}
          {questions[currentQuestion].type === "slider" &&
            questions[currentQuestion].id === "age" && (
              <AgeSlider
                min={(questions[currentQuestion].options as SliderQuestion).min}
                max={(questions[currentQuestion].options as SliderQuestion).max}
                step={
                  (questions[currentQuestion].options as SliderQuestion).step
                }
                colors={
                  (questions[currentQuestion].options as SliderQuestion)
                    .colors || []
                }
                minLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .minLabel || "Min"
                }
                maxLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .maxLabel || "Max"
                }
                selectedLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .selectedLabel || "Selected"
                }
                value={
                  (questions[currentQuestion].options as SliderQuestion)
                    .selected
                }
                onChange={handleSliderChange}
              />
            )}
          {questions[currentQuestion].type === "slider" &&
            questions[currentQuestion].id === "skintype" && (
              <SkinTypeSlider
                min={(questions[currentQuestion].options as SliderQuestion).min}
                max={(questions[currentQuestion].options as SliderQuestion).max}
                step={
                  (questions[currentQuestion].options as SliderQuestion).step
                }
                colors={
                  (questions[currentQuestion].options as SliderQuestion)
                    .colors || []
                }
                minLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .minLabel || "Min"
                }
                maxLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .maxLabel || "Max"
                }
                selectedLabel={
                  (questions[currentQuestion].options as SliderQuestion)
                    .selectedLabel || "Selected"
                }
                value={
                  (questions[currentQuestion].options as SliderQuestion)
                    .selected
                }
                onChange={handleSliderChange}
              />
            )}
          {questions[currentQuestion].type === "multi" && (
            <MultiSelect
              options={
                (questions[currentQuestion].options as MultiSelectQuestion)
                  .effects
              }
              selected={
                (questions[currentQuestion].options as MultiSelectQuestion)
                  .selected
              }
              triggerOption={triggerOption}
            />
          )}
          {questions[currentQuestion].type === "single" && (
            <SingleSelect
              options={
                (questions[currentQuestion].options as SingleQuestion).options
              }
              selected={
                (questions[currentQuestion].options as SingleQuestion).selected
              }
              triggerOption={triggerSingleOption}
            />
          )}
        </>
      ) : (
        <SummaryDisplay userInformation={currentUserInformation} />
      )}

      <div className="flex flex-col items-center justify-center gap-3 w-full">
        {!summaryMode ? (
          <>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full"
                >
                  <p className="text-primary/80 ">
                    How does this affect my stack?
                  </p>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="flex flex-col items-center justify-start gap-2 w-full p-4 min-h-[30vh]">
                  <DrawerHeader>
                    <DrawerTitle>
                      {questions[currentQuestion].question}
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-primary text-lg">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
            {currentQuestion < questions.length - 1 ? (
              <Button
                size="xl"
                variant="glass"
                className="w-full"
                onClick={nextQuestion}
              >
                Next Question
              </Button>
            ) : (
              <Button
                size="xl"
                variant="glass"
                className="w-full"
                onClick={() => triggerConversion()}
              >
                <IoSparkles size={24} />
                Finish
              </Button>
            )}
          </>
        ) : (
          <Button
            size="xl"
            variant="glass"
            className="w-full"
            onClick={() => {
              if (currentUserInformation) {
                updateUserInformation(currentUserInformation);
                routeTo("/stack");
              }
            }}
          >
            <IoSparkles size={24} />
            Generate Stack
          </Button>
        )}
      </div>
    </div>
  );
}
