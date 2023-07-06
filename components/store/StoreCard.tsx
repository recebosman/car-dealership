"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

type StoreCardProps = {
  storeName: string;
  id: number;
};

export function StoreCard({ storeName, id }: StoreCardProps) {
  const handleDelete = async (id: number) => {
    try {
      const res = await axios
        .delete("/api/store", {
          params: {
            id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => window.location.reload())
        .then(() => toast.success("Store deleted successfully."))
        .catch(() =>
          toast.error("Something went wrong. Please try again later.")
        );

      return res;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="w-[350px] h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {storeName}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant="ghost">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Change Name</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  <span>Delete Shop</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-gray-500">{storeName}.com</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-lg text-gray-500">Total Vehicles</span>
            <span className="text-2xl font-bold">5</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-lg text-gray-500">Total Orders</span>
            <span className="text-2xl font-bold">5</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="default">View Store</Button>
      </CardFooter>
    </Card>
  );
}
