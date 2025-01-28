import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

import { DryIcon, OilyIcon } from "@/app/components/icons";
import { skinTypeMapping } from "@/app/types";

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
    const skinType = skinTypeMapping[value as keyof typeof skinTypeMapping];
    setCurrentLabel(skinType[0]);
    setCurrentColor(skinType[1]);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full fade-in">
      <div className="flex fade-down flex-row items-center justify-between gap-2 w-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <DryIcon className="h-12 w-12" />
          <p className="text-lg">{minLabel}</p>
        </div>
        <div>
          <p className="text-lg">{currentLabel}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <OilyIcon className="h-12 w-12" />
          <p className="text-lg">{maxLabel}</p>
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
