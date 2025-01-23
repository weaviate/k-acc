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

export default function Login() {
  const { routeTo } = useContext(RouterContext);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-row items-center justify-start gap-2 w-full">
        <Button
          size="icon"
          variant="outline"
          onClick={() => routeTo("/welcome")}
        >
          <IoCaretBack size={24} />
        </Button>
        <div className="flex items-center justify-start gap-1">
          <p className="text-lg ">Sign in to</p>
          <p className="text-lg font-bold">glowyou</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Button variant="glass">
          <FaGoogle size={24} />
          Continue with Google
        </Button>
        <p>or</p>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
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
          </CardContent>
        </Card>
        <Button variant="glass" className="w-full">
          Sign in
        </Button>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold">
            Sign up
          </Link>
        </p>
        <p className="text-sm">
          Forgot your password?{" "}
          <Link href="/signup" className="font-bold">
            Reset password
          </Link>
        </p>
      </div>
    </div>
  );
}
