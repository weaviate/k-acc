"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserInformation } from "../types";
export const RouterContext = createContext<{
  routeTo(route: string): void;
  userInformation: UserInformation | null;
  updateUserInformation(userInformation: UserInformation): void;
}>({
  routeTo: () => {},
  userInformation: null,
  updateUserInformation: () => {},
});

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);

  const routeTo = (route: string) => {
    router.push(route);
  };

  const updateUserInformation = (userInformation: UserInformation) => {
    setUserInformation(userInformation);
  };

  return (
    <RouterContext.Provider
      value={{ routeTo, userInformation, updateUserInformation }}
    >
      {children}
    </RouterContext.Provider>
  );
};
