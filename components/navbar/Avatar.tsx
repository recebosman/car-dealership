"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, TimerIcon, User } from "lucide-react";
import { signOut } from "next-auth/react";
import GetCurrentUser from "@/action/auth/GetCurrentUser";

const AvatarNav = () => {
  const { user } = GetCurrentUser();
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [day, setDay] = React.useState(new Date().toLocaleDateString());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDay(new Date().toLocaleDateString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hidden md:flex">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={user?.session?.user?.name}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex">
          {user?.session?.user?.name}
          <Badge className="ml-2" color="primary" variant={"default"}>
            Admin
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem className="flex gap-x-2">
          <span>
            <User size={16} />
          </span>
          Profile
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={handleLogout}
          className="flex gap-x-2"
        >
          <span>
            <LogOut size={16} />
          </span>
          Log Out
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <div className="flex justify-between gap-x-2">
            <span>
              <TimerIcon size={16} />
            </span>
            <span>{time}</span>
            <span>{day}</span>
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarNav;
