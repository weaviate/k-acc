import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { MultiOption } from "../types";

interface MultiSelectProps {
  options: MultiOption[];
  selected: string[];
  triggerOption: (option: MultiOption) => void;
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
            selected.includes(option.name) ? "bg-white scale-105" : "glass-card"
          }`}
          key={option.name}
          onClick={() => triggerOption(option)}
        >
          {option.icon && <option.icon className="w-12 fade-down" />}
          <p className={`${selected.includes(option.name) ? "font-bold" : ""}`}>
            {option.name}
          </p>
        </div>
      ))}
    </div>
  );
}
