"use client";

import Navbar from "@/components/ui/navbar";
import { RouterContext } from "../components/useRouter";
import { useContext, useEffect, useState } from "react";
import SubMenu from "../components/submenu";
import { Button } from "@/components/ui/button";
import { IoCaretBack } from "react-icons/io5";
import { getStack } from "./api";

export default function StackPage() {
  const { routeTo, userInformation } = useContext(RouterContext);

  const [loading, setLoading] = useState(false);

  const triggerStack = async () => {
    if (!userInformation) {
      routeTo("/questionnaire");
    } else {
      setLoading(true);
      await getStack(userInformation);
    }
  };

  useEffect(() => {
    triggerStack();
  }, [userInformation]);

  return (
    <div className="flex fade-in flex-col items-center flex-grow justify-start h-full gap-4 ">
      <Navbar>
        <Button
          size="icon"
          variant="outline"
          onClick={() => routeTo("/questionnaire")}
        >
          <IoCaretBack size={24} />
        </Button>
        <SubMenu />
      </Navbar>

      {loading ? (
        <div className="w-full h-full items-center flex flex-col justify-center">
          <Button onClick={triggerStack}>
            <p>Refresh</p>
          </Button>
          <div className="loader">
            <div className="item1"></div>
            <div className="item2"></div>
            <div className="item3"></div>
          </div>
        </div>
      ) : (
        <p>Stack Page</p>
      )}
    </div>
  );
}
