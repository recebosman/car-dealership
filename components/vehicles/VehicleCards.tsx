"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Car, Heart, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import TextWithIcon from "../ui/TextWithIcon";
import { toast } from "react-hot-toast";
import { Badge } from "../ui/badge";

const VehicleCards = () => {
  const [showOtherPhotos, setShowOtherPhotos] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (data: any) => {
    setIsLiked((prev) => !prev);
    {
      isLiked
        ? toast.error("Porsche 718 Cayman S removed from your favorites")
        : toast.success("Porsche 718 Cayman S added to your favorites");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Porsche 718 Cayman S
          <Heart
            className={clsx("hover:text-red-500", {
              "text-red-500": isLiked,
            })}
            size={20}
            onClick={handleLike}
          />
        </CardTitle>
        <CardDescription>
          Coupe
          <Badge variant={"green"} className="ml-2 ">
            New
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={showOtherPhotos ? "/assets/vehicle2.jpg" : "/assets/vehicle.jpg"}
          alt="Porsche 718 Cayman S"
          width={500}
          height={300}
          onMouseEnter={() => setShowOtherPhotos(true)}
          onMouseLeave={() => setShowOtherPhotos(false)}
          className="rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105"
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <TextWithIcon Text="4 " Icon={User} />
          <TextWithIcon Text="Manual" Icon={Car} />
        </div>
        <div>
          <span className="font-bold text-lg md:text-2xl lg:text-2xl cursor-pointer ml-2">
            $199.000
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleCards;
