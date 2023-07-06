"use client";

import { Nav_Links } from "@/constants";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { AvatarSheet } from "./SheetAvatar";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide() {
  return (
    <Sheet key={"left"}>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="outline" size={"icon"}>
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="text-left">
          <SheetTitle>Rekon Rent a Car</SheetTitle>
          <SheetDescription>Welcome to Car Dealership</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <>
            <Input
              id="search"
              className="col-span-3"
              placeholder="Search"
              autoFocus={false}
            />
          </>
          <ul className="flex flex-col font-bold text-3xl space-y-4">
            {Nav_Links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.path}
                  className="text-gray-900 hover:text-gray-500 "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter className="w-full h-full">
          <div className=" w-full flex  gap-x-2 items-center ">
            <AvatarSheet />
            <div className="flex flex-col -space-y-1">
              <SheetTitle>Receb Osman Karaaslan</SheetTitle>
              <span className="text-md">karaaslanosman@gmail.com</span>
            </div>
            <Button variant="outline" size={"icon"}>
              <LogOut size={24} />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
