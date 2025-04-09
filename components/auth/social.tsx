"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    console.log({ provider });
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex flex-col w-full gap-x-2 items-center">
      <Button
        size="lg"
        className="w-full cursor-pointer"
        variant="outline"
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full cursor-pointer"
        variant="outline"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
