"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
export const RouterContext = createContext<{
  routeTo(route: string): void;
}>({
  routeTo: () => {},
});

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const routeTo = (route: string) => {
    router.push(route);
  };

  return (
    <RouterContext.Provider value={{ routeTo }}>
      {children}
    </RouterContext.Provider>
  );
};
