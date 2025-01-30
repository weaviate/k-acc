import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { skinTypeMapping, UserInformation, Effects } from "../types";
import React from "react";

interface SummaryDisplayProps {
  userInformation: UserInformation | null;
}

export default function SummaryDisplay({
  userInformation,
}: SummaryDisplayProps) {
  if (!userInformation) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 fade-in">
      <div className="flex flex-col items-start justify-start w-full gap-2 fade-in">
        <p className="text-primary/80 text-lg">Information</p>
        <div className="flex flex-col items-center justify-center w-full gap-4 p-4 bg-white rounded-xl">
          <div className="w-full fade-in flex items-center rounded-xl justify-start gap-2 ">
            {(() => {
              const Icon =
                skinTypeMapping[
                  userInformation.skinType as keyof typeof skinTypeMapping
                ][2];
              return Icon && <Icon className="h-6 w-6" />;
            })()}
            <p className="text-primary">
              {
                skinTypeMapping[
                  userInformation.skinType as keyof typeof skinTypeMapping
                ][0]
              }
              {userInformation.sensitive ? " Sensitive" : ""} Skin
            </p>
          </div>
          <div className="w-full fade-in  flex items-center rounded-xl justify-start gap-2 ">
            <p className="text-primary text-xl font-bold w-6 items-center justify-center">
              {userInformation.age}
            </p>
            <p className="text-primary">years old</p>
          </div>
          <div className="w-full fade-in flex items-center rounded-xl justify-start gap-2 ">
            <div
              className={`w-6 h-6 bg-FST${userInformation.skinTone} rounded-md`}
            ></div>
            <p className="text-primary">{userInformation.skinTone} FST</p>
          </div>
        </div>
      </div>
      {userInformation.goals.length > 0 && (
        <div className="flex flex-col items-start justify-start w-full fade-in">
          <p className="text-primary/80 text-lg">
            {userInformation.goals.length} Goals
          </p>
          <div className="flex flex-row items-start justify-start gap-2 w-full overflow-x-auto whitespace-nowrap scrollbar-hide p-3">
            {userInformation.goals.map((goal, index) => (
              <div
                className={`fade-in aspect-square w-[100px] flex-shrink-0 flex flex-col items-center transition-all duration-300 rounded-xl justify-center gap-2 bg-white
                     }`}
                key={goal + index}
              >
                {Effects[goal].icon &&
                  React.createElement(Effects[goal].icon, {
                    className: "h-8 w-8 fade-down",
                  })}
                <p className="text-sm">{Effects[goal].displayName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {userInformation.conditions.length > 0 && (
        <div className="flex flex-col items-start justify-start w-full fade-in">
          <p className="text-primary/80 text-lg">
            {userInformation.conditions.length} Conditions
          </p>
          <div className="flex flex-row items-start justify-start gap-2 w-full overflow-x-auto whitespace-nowrap scrollbar-hide p-3">
            {userInformation.conditions.map((condition, index) => (
              <div
                className={`fade-in aspect-square w-[100px] flex-shrink-0 flex flex-col items-center transition-all duration-300 rounded-xl justify-center gap-2 bg-white
                     }`}
                key={condition + index}
              >
                {Effects[condition].icon &&
                  React.createElement(Effects[condition].icon, {
                    className: "h-8 w-8 fade-down",
                  })}
                <p className="text-sm">{Effects[condition].displayName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
