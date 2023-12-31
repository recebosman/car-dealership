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
import Link from "next/link";
import axios from "axios";
import GetCurrentUser from "@/action/auth/GetCurrentUser";
import { useSession } from "next-auth/react";

interface VehicleCardsProps {
  data: any;
}

const VehicleCards = ({ data }: VehicleCardsProps) => {
  const { id, name, model, vehicle_type, price } = data;
  const { user } = GetCurrentUser();

  const [showOtherPhotos, setShowOtherPhotos] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (id: number) => {
    try {
      const res = axios
        .post(`/api/fav`, {
          VehicleId: id,
          UserEmail: user?.session?.user?.email,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLiked(true);
            toast.success("Vehicle added to favorites");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data.error);
          }
        });

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {name}
          <Heart
            className={clsx("hover:text-red-500", {
              "text-red-500": isLiked,
            })}
            size={20}
            onClick={() => {
              handleLike(id);
            }}
          />
        </CardTitle>
        <CardDescription>
          {model}
          {vehicle_type === "new" ? (
            <Badge variant={"green"} className="ml-2 capitalize">
              {vehicle_type}
            </Badge>
          ) : vehicle_type === "used" ? (
            <Badge variant={"yellow"} className="ml-2 capitalize">
              {vehicle_type}
            </Badge>
          ) : (
            <Badge variant={"brown"} className="ml-2 capitalize">
              {vehicle_type}
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/dashboard/vehicles/${data.id}`}>
          <Image
            src={data.Images[0].url}
            alt="Porsche 718 Cayman S"
            width={500}
            height={200}
            onMouseEnter={() => setShowOtherPhotos(true)}
            onMouseLeave={() => setShowOtherPhotos(false)}
            className="rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 h-[200px] w-[500px] object-cover"
          />
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <TextWithIcon Text="4 " Icon={User} />
          <TextWithIcon Text="Manual" Icon={Car} />
        </div>
        <div>
          <span className="font-bold text-lg md:text-2xl lg:text-2xl cursor-pointer ml-2">
            <span className="text-green-600">$</span>{" "}
            <span className="text-slate-900">
              {price.toLocaleString().split(",")[0]}
            </span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleCards;
