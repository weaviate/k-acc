"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    rangeColor?: string;
    selectedLabel?: string;
    currentValue?: number;
    maxValue?: number;
  }
>(
  (
    { className, rangeColor, selectedLabel, currentValue, maxValue, ...props },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-7 glass-card w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range
          className={cn(
            `absolute h-full rounded-l-full transition-colors duration-300`,
            rangeColor || "bg-primary",
            maxValue == currentValue && "rounded-r-full"
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="relative block h-9 w-9 glass-card rounded-full border border-primary/50 bg-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        {selectedLabel && (
          <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-primary">
            {selectedLabel} {currentValue}
          </span>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
