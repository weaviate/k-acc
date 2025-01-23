import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoSparklesSharp } from "react-icons/io5";

interface StackPersonaProps {
  persona_img: string;
  persona_name: string;
}

export default function StackPersona({
  persona_img,
  persona_name,
}: StackPersonaProps) {
  const product_card = cn(
    "fade-down cursor-pointer flex items-center justify-center hover:scale-[1.1] transition-all duration-300 ease-in-out aspect-square w-28 z-10 bg-opacity-95 backdrop-blur-xl rounded-2xl overflow-hidden"
  );

  return (
    <div className="absolute flex-col flex h-screen aspect-[8/18] items-center justify-center ">
      <div className="flex flex-col items-center rounded-3xl justify-end bg-gradient-to-t fade-in aspect-[8/17] from-lime-400/80 to-background overflow-hidden">
        <p className="absolute top-28 text-primary text-xl text-center fade-down">
          {persona_name}'s Stack
        </p>
        <img
          src={persona_img}
          alt={persona_name}
          className="w-full h-full object-cover scale-[1.4] -translate-y-20"
        />
      </div>
      <div className="absolute flex items-center justify-center bottom-20 h-[11vh] w-full glass-card fade-in gap-3">
        <div className={product_card + " bg-blue-300 relative bottom-4"}>
          <img src="/product_1.png" alt="emma" className="w-full h-full" />
        </div>
        <div className={product_card + " bg-teal-300 relative bottom-4"}>
          <img src="/product_2.png" alt="emma" className="w-full h-full" />
        </div>
        <div className={product_card + " bg-red-300 relative bottom-4"}>
          <img src="/product_3.png" alt="emma" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
