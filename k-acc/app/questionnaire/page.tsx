"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IoCaretBack, IoLogIn, IoSparklesSharp, IoMenu } from "react-icons/io5";
import { RouterContext } from "../components/useRouter";
import { useContext } from "react";

export default function Questionnaire() {
  const { routeTo } = useContext(RouterContext);

  return (
    <div className="flex flex-col items-center justify-start h-screen p-8 gap-4 ">
      {/** Header */}
      <div className="flex flex-row items-center justify-between gap-2 w-full">
        <Button size="icon" variant="outline" onClick={() => routeTo("/")}>
          <IoCaretBack size={24} />
        </Button>
        <div className="flex items-center justify-start gap-1">
          <p className="text-xl ">Welcome to</p>
          <p className="text-xl font-bold">glowyou</p>
        </div>
        <Sheet>
          <SheetTrigger>
            <IoMenu size={24} />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-center justify-center gap-2">
            <SheetHeader>
              <SheetTitle>glowyou</SheetTitle>
            </SheetHeader>
            <div className="flex flex-grow w-full flex-col items-center justify-center gap-2">
              <Button size="xl" variant="glass" className="min-w-[300px]">
                Log in
              </Button>
              <Button size="xl" variant="glass" className="min-w-[300px]">
                Sign up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/** Display */}
      <div className="flex items-center justify-center w-full aspect-[9/10] overflow-hidden rounded-2xl">
        <img
          src="/product_display.png"
          alt="glowyou"
          className="w-full object-cover scale-[1.1]"
        />
      </div>
      <div className="flex flex-col items-center justify-start gap-3 w-full">
        <p className="text-primary">
          Discover your ideal skincare routine, guided by AI and backed by
          science.
        </p>
        <p className="text-primary">
          Simply <strong>take our survey</strong> to outline your preferences,
          goals, and concerns, and let GlowYou design a personalized stack
          tailored to your needs. Log in to save your results and a{" "}
          <strong>chance of winning</strong> generated stacks.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 w-full flex-grow">
        <Button size="xl" variant="glass" className="min-w-[300px]">
          <IoSparklesSharp size={24} />
          Start survey
        </Button>
        <Button size="xl" variant="glass" className="min-w-[300px]">
          <IoLogIn size={24} />
          Log in
        </Button>
      </div>
    </div>
  );
}
