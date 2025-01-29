"use client";

import Navbar from "@/components/ui/navbar";
import { RouterContext } from "../components/useRouter";
import { useContext, useEffect, useState } from "react";
import SubMenu from "../components/submenu";
import { Button } from "@/components/ui/button";
import { IoCaretBack } from "react-icons/io5";
import { getStack } from "./api";
import { Stack } from "./types";
import ProductCard from "./product_card";
import { IoIosSunny } from "react-icons/io";

export default function StackPage() {
  const { routeTo, userInformation } = useContext(RouterContext);

  const [loading, setLoading] = useState(false);

  const [stack, setStack] = useState<Stack | null>(null);

  const triggerStack = async () => {
    if (!userInformation) {
      routeTo("/questionnaire");
    } else {
      setLoading(true);
      const newStack = await getStack(userInformation);
      setStack(newStack);
      setLoading(false);
    }
  };

  useEffect(() => {
    triggerStack();
  }, [userInformation]);

  return (
    <div className="flex fade-in flex-col items-center flex-grow justify-start h-full gap-3 ">
      <Navbar>
        <Button
          size="icon"
          variant="outline"
          onClick={() => routeTo("/questionnaire?summary=true")}
        >
          <IoCaretBack size={24} />
        </Button>
        {loading ? (
          <p className="text-primary font-bold text-lg fade-in">
            Creating stack...
          </p>
        ) : (
          <p className="text-primary font-bold text-lg fade-in">Your stack</p>
        )}
        <SubMenu />
      </Navbar>
      {loading && (
        <div className="w-full h-full items-center flex flex-col justify-center">
          <div className="loader">
            <div className="item1"></div>
            <div className="item2"></div>
            <div className="item3"></div>
          </div>
        </div>
      )}{" "}
      {stack && !loading && (
        <div className="flex flex-col items-start justify-start w-full h-full gap-2">
          <div className="flex items-center gap-2">
            <IoIosSunny size={24} className="text-primary" />
            <p className="text-primary font-bold text-lg">Morning Routine</p>
          </div>
          <div className="flex overflow-x-auto w-full h-full gap-4 py-8">
            <ProductCard
              product={stack?.cleanser}
              label="Cleanser"
              bgColor="green"
            />
            <ProductCard
              product={stack?.moisturizer}
              label="Moisturizer"
              bgColor="violet"
            />
          </div>
        </div>
      )}
    </div>
  );
}
