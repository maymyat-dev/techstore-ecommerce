"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { signIn } from "next-auth/react";

const ProviderLogin = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <FcGoogle size={18} /> Login with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <ImGithub size={18} /> Login with GitHub
      </Button>
    </div>
  );
};

export default ProviderLogin;
