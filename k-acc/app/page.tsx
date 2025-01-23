"use client";

import { Button } from "@/components/ui/button";
import { IoSparklesSharp } from "react-icons/io5";
import StackPersona from "./components/stack-persona";
import { useContext, useState } from "react";
import { RouterContext } from "./components/useRouter";

export default function Home() {
  const { routeTo } = useContext(RouterContext);

  return (
    <div className="flex h-full flex-col items-center justify-end">
      <StackPersona persona_img="/emma.png" persona_name="Emma" />
      <div className="flex flex-col gap-4">
        <Button
          size="xxl"
          variant="glass"
          className="fade-in"
          onClick={() => routeTo("/welcome")}
        >
          <IoSparklesSharp size={24} />
          Find your Stack
        </Button>
      </div>
    </div>
  );
}
