import { Effect } from "../types";

interface SingleSelectProps {
  options: string[];
  selected: string;
  triggerOption: (option: string) => void;
}

export default function SingleSelect({
  options,
  selected,
  triggerOption,
}: SingleSelectProps) {
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-4 w-full fade-in">
      {options.map((option) => (
        <div
          className={`w-full fade-in h-[150px] hover:scale-105 shadow-md flex flex-col items-center cursor-pointer transition-all duration-300 rounded-xl justify-center gap-2 ${
            selected.includes(option)
              ? "bg-white scale-105 border border-primary"
              : "glass-card opacity-70"
          }`}
          key={option}
          onClick={() => triggerOption(option)}
        >
          <p
            className={`text-lg ${
              selected.includes(option) ? "font-bold" : ""
            }`}
          >
            {option}
          </p>
        </div>
      ))}
    </div>
  );
}
