"use client";
import { Session } from "next-auth";
import React from "react";
import { SettingCard } from "./settings-card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserRoundPen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <SettingCard>
      <div className="flex justify-between items-start gap-2 rounded-2xl">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={session.user?.image!}
              alt="Profile"
              className="w-12 h-12 bg-cover rounded-full"
            />
            <AvatarFallback className="bg-primary text-white font-bold">
              {session.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{session.user?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>

        {isDesktop ? (
          <Dialog>
            <DialogTrigger asChild>
              <UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Do you want to edit your profile</DialogTitle>
                <DialogDescription>
                  <Input type="text" className="w-full" />
                  
                </DialogDescription>
                <DialogFooter>
                  <Button>Save Changes</Button>
                  <DialogClose>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer>
            <DrawerTrigger asChild><UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" /></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Do you want to edit your profile</DrawerTitle>
                <DrawerDescription>
                  <Input type="text" className="w-full" />
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Save Changes</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </SettingCard>
  );
};

export default ProfileCard;
