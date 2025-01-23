import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

interface SkinToneSliderProps {
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

export default function SkinToneSlider({
  min,
  max,
  value,
  step,
  colors,
  minLabel,
  maxLabel,
  selectedLabel,
  onChange,
}: SkinToneSliderProps) {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  useEffect(() => {
    setCurrentColor(colors[value - 1]);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full fade-in">
      <div className="flex flex-col items-center justify-center flex-grow gap-12 w-full">
        <div
          className={cn(
            "w-28 glass-card h-28 rounded-full flex items-center justify-center fade-down",
            currentColor
          )}
        >
          <div
            className={cn(
              "w-28 h-28 rounded-2xl transition-all duration-300",
              currentColor
            )}
          />
        </div>
        <Slider
          value={[value]}
          currentValue={value}
          maxValue={max}
          min={min}
          max={max}
          step={step}
          rangeColor={currentColor}
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
