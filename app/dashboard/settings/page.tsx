import ChangePassword from "@/components/settings/change-password";
import ProfileCard from "@/components/settings/profile-card";
import { SettingCard } from "@/components/settings/settings-card";
import TwoFactorAuthentication from "@/components/settings/two-factor";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const settingsPage = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");

  return (
    <>
    <h2 className="font-bold text-2xl"> Setting</h2>
      <p className=" text-sm text-muted-foreground mb-5"> Manage your account settings</p>
    <SettingCard>
      
      <main className="mt-5">
        <div className="md:flex justify-between mb-5">
          <div className="md:w-1/3 w-full mb-5">
            <h2 className="font-bold">Profile</h2>
            <p className="text-sm text-muted-foreground">
              This information will be displayed publicly.
            </p>
          </div>
          <div className="md:w-2/3 w-full">
            <ProfileCard session={session} />
          </div>
        </div>

        <div className="md:flex justify-between">
          <div className="md:w-1/3 w-full  mb-5">
            <h2 className="font-bold">Security</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account security settings.
            </p>
          </div>
          {!session.user.isOauth && session.user.email && (
            <div className="md:w-2/3 w-full">
              <div className="mb-5">
                <ChangePassword email={session.user.email} />
              </div>
              <TwoFactorAuthentication
                isTwoFactorEnabled={session.user.isTwoFactorEnabled}
                email={session.user.email}
              />
            </div>
          )}
        </div>
      </main>
    </SettingCard></>
  );
};

export default settingsPage;
