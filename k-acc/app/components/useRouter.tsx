"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserInformation } from "../types";
import { StackPayload } from "../stack/types";
export const RouterContext = createContext<{
  routeTo(route: string): void;
  userInformation: UserInformation | null;
  updateUserInformation(userInformation: UserInformation): void;
  stack: StackPayload | null;
  updateStack(stack: StackPayload): void;
}>({
  routeTo: () => {},
  userInformation: null,
  updateUserInformation: () => {},
  stack: null,
  updateStack: () => {},
});

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);

  const [stack, setStack] = useState<StackPayload | null>(null);

  const routeTo = (route: string) => {
    router.push(route);
  };

  const compareUserInformation = (a: UserInformation, b: UserInformation) => {
    if (a.age !== b.age) return false;
    if (a.skinType !== b.skinType) return false;
    if (a.skinTone !== b.skinTone) return false;
    if (a.goals !== b.goals) return false;
    if (a.conditions !== b.conditions) return false;
    if (a.sensitive !== b.sensitive) return false;
    return true;
  };

  const updateUserInformation = (new_information: UserInformation) => {
    if (userInformation != null && stack != null) {
      if (!compareUserInformation(userInformation, new_information)) {
        setStack(null);
      }
    }
    setUserInformation(new_information);
  };

  const updateStack = (stack: StackPayload) => {
    setStack(stack);
  };

  return (
    <RouterContext.Provider
      value={{
        routeTo,
        userInformation,
        updateUserInformation,
        stack,
        updateStack,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};
