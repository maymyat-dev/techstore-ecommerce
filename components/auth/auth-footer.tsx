import Link from "next/link";
import React from "react";

type AuthFooterProps = {
  footerLabel: string;
  footerHref: string;
};

const AuthFooter = ({ footerLabel, footerHref }: AuthFooterProps) => {
  return (
    <p className="text-sm text-center text-gray-600">
      {footerLabel}{" "}
      <Link href={footerHref} className="text-primary hover:underline">
        Click here
      </Link>
    </p>
  );
};

export default AuthFooter;
