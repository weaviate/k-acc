import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { Effect } from "../types";

interface MultiSelectProps {
  options: Effect[];
  selected: string[];
  triggerOption: (option: Effect) => void;
}

export default function MultiSelect({
  options,
  selected,
  triggerOption,
}: MultiSelectProps) {
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-4 w-full fade-in">
      {options.map((option) => (
        <div
          className={`w-full fade-in h-[150px] hover:scale-105 shadow-md flex flex-col items-center cursor-pointer transition-all duration-300 rounded-xl justify-center gap-2 ${
            selected.includes(option.id)
              ? "bg-white scale-105 border border-primary"
              : "glass-card opacity-70"
          }`}
          key={option.id}
          onClick={() => triggerOption(option)}
        >
          {option.icon && <option.icon className="h-12 w-12 fade-down" />}
          <p
            className={`text-lg ${
              selected.includes(option.id) ? "font-bold" : ""
            }`}
          >
            {option.displayName}
          </p>
        </div>
      ))}
    </div>
  );
}
