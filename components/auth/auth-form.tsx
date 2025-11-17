import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProviderLogin from "./provider-login";
import AuthFooter from "./auth-footer";
import { MonitorSmartphone } from 'lucide-react';
import Image from "next/image";


type AuthFormProps = {
  children: React.ReactNode;
  formTitle: string;
  formText?: string;
  showProvider?: boolean;
  footerLabel: string;
  footerHref: string;
};

const AuthForm = ({
  children,
  formTitle,
  showProvider = false,
  footerLabel,
  footerHref,
  formText
}: AuthFormProps) => {
  return (
    <div className="md:flex justify-between w-full h-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
      <div className="md:w-1/2 relative hidden md:block min-h-[300px]">
        <Image src="/images/welcome.jpg" alt="Welcome" fill className="object-cover rounded-l-2xl " />
        {/* <div className="absolute inset-0 bg-black opacity-40 rounded-l-2xl"></div> 
        
        <h2 className="absolute top-10 left-10 text-white z-10 text-2xl font-bold">TechStore</h2> */}
      </div>

      <div className="flex justify-center items-center md:w-1/2">
      <Card className="w-full shadow-lg rounded-2xl md:rounded-l-none">
        <CardHeader>
          <div className="text-center p-4 rounded-full mx-auto bg-primary mb-2"> <MonitorSmartphone size="25" className="text-white" /></div>
          <CardTitle className="text-center text-xl font-bold">
            {formTitle}
            
          </CardTitle>
          <p className="text-gray-500 text-center text-sm">{formText}</p>
        </CardHeader>

        <CardContent className="space-y-4">{children}</CardContent>

        {showProvider && (
          <CardContent>
            <div className="mb-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm font-medium uppercase">
                Or continue with
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <ProviderLogin />
          </CardContent>
        )}

        <CardFooter className="flex justify-center">
          <AuthFooter footerLabel={footerLabel} footerHref={footerHref} />
        </CardFooter>
      </Card>
    </div>
    </div>
  );
};

export default AuthForm;
