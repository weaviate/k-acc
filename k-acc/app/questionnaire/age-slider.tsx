import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

interface AgeSliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  colors: string[];
  minLabel: string;
  maxLabel: string;
  selectedLabel: string;
  onChange: (value: number) => void;
}

export default function AgeSlider({
  min,
  max,
  value,
  step,
  minLabel,
  maxLabel,
  selectedLabel,
  onChange,
}: AgeSliderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full fade-in">
      <div className="flex flex-col items-center justify-center flex-grow gap-12 w-full">
        <Slider
          value={[value]}
          currentValue={value}
          maxValue={max}
          min={min}
          max={max}
          step={step}
          rangeColor={"bg-primary"}
          selectedLabel={selectedLabel}
          onValueChange={(value) => {
            onChange(value[0]);
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-2 w-full">
        <p>{minLabel}</p>
        <p>{maxLabel}</p>
      </div>
    </div>
  );
}
