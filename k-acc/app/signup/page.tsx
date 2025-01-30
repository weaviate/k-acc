"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import { IoCaretBack, IoLogIn, IoSparklesSharp, IoMenu } from "react-icons/io5";
import { RouterContext } from "../components/useRouter";
import { useContext } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUp() {
  const { routeTo } = useContext(RouterContext);

  return (
    <div className="flex flex-col justify-between h-full fade-in">
      <div className="flex flex-row items-center justify-start gap-2 w-full">
        <Button
          size="icon"
          variant="outline"
          onClick={() => routeTo("/welcome")}
        >
          <IoCaretBack size={24} />
        </Button>
        <div className="flex items-center justify-start gap-1">
          <p className="text-lg ">Sign up to</p>
          <p className="text-lg font-bold">glowyou</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 fade-down">
        <Button variant="glass">
          <FaGoogle size={24} />
          Sign up with Google
        </Button>
        <p>or</p>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-sm">Email</p>
              <Input />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-sm">Password</p>
              <Input type="password" />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-sm">Confirm password</p>
              <Input type="password" />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept Weaviate's{" "}
            <Link href="/terms" className="font-bold">
              terms and conditions
            </Link>
          </label>
        </div>
        <Button variant="glass" className="w-full">
          Sign up
        </Button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
