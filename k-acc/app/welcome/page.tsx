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
import SubMenu from "../components/submenu";
import Navbar from "@/components/ui/navbar";

export default function Welcome() {
  const { routeTo } = useContext(RouterContext);

  return (
    <div className="flex fade-in flex-col items-center flex-grow justify-start h-full gap-4 ">
      {/** Header */}
      <Navbar>
        <Button size="icon" variant="outline" onClick={() => routeTo("/")}>
          <IoCaretBack size={24} />
        </Button>
        <div className="flex items-center justify-start gap-1">
          <p className="text-xl ">Welcome to</p>
          <p className="text-xl font-bold">glowyou</p>
        </div>
        <SubMenu />
      </Navbar>
      {/** Display */}
      <div className="flex fade-down items-center justify-center w-full aspect-[9/10] overflow-hidden rounded-2xl">
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
          Simply <strong>take our questionnaire</strong> to outline your
          preferences, goals, and concerns, and let GlowYou design a
          personalized stack tailored to your needs. Log in to save your results
          and a <strong>chance of winning</strong> generated stacks.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 w-full flex-grow">
        <Button
          size="xl"
          variant="glass"
          className="w-full"
          onClick={() => routeTo("/questionnaire")}
        >
          <IoSparklesSharp size={24} />
          Answer questions
        </Button>
        <Button
          size="xl"
          variant="glass"
          className="w-full"
          onClick={() => routeTo("/login")}
        >
          <IoLogIn size={24} />
          Log in
        </Button>
      </div>
    </div>
  );
}
