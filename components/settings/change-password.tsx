import React from "react";
import { SettingCard } from "./settings-card";
import { KeyRound } from "lucide-react";

const ChangePassword = () => {
  return (
    <SettingCard>
      <div className="flex justify-between items-center">
        <p>Change Password</p>
        <KeyRound className="w-5 h-5" />
      </div>
    </SettingCard>
  );
};

export default ChangePassword;
