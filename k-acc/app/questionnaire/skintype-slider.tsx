import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

import { DryIcon, OilyIcon } from "@/app/components/icons";
import { redirect } from "next/dist/server/api-utils";

interface SkinTypeSliderProps {
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

export default function SkinTypeSlider({
  min,
  max,
  value,
  step,
  minLabel,
  maxLabel,
  selectedLabel,
  onChange,
}: SkinTypeSliderProps) {
  const [currentColor, setCurrentColor] = useState("bg-green-300");
  const [currentLabel, setCurrentLabel] = useState("Normal Skin");
  useEffect(() => {
    if (value < 2) {
      setCurrentLabel("Very Dry Skin");
      setCurrentColor("bg-violet-400");
    } else if (value >= 2 && value < 4) {
      setCurrentLabel("Dry Skin");
      setCurrentColor("bg-violet-300");
    } else if (value >= 4 && value < 6) {
      setCurrentLabel("Normal Skin");
      setCurrentColor("bg-green-300");
    } else if (value >= 6 && value < 8) {
      setCurrentLabel("Oily Skin");
      setCurrentColor("bg-orange-300");
    } else {
      setCurrentLabel("Very Oily Skin");
      setCurrentColor("bg-orange-400");
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full fade-in">
      <div className="flex fade-down flex-row items-center justify-between gap-2 w-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <DryIcon className="h-12 w-12" />
          <p>{minLabel}</p>
        </div>
        <div>
          <p>{currentLabel}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <OilyIcon className="h-12 w-12" />
          <p>{maxLabel}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow gap-12 w-full">
        <Slider
          value={[value]}
          currentValue={value}
          maxValue={max}
          min={min}
          max={max}
          step={step}
          rangeColor={currentColor}
          onValueChange={(value) => {
            onChange(value[0]);
          }}
        />
      </div>
    </div>
  );
}
