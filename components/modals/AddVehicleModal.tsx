"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Store } from "lucide-react";
import { useForm } from "react-hook-form";
import { vehicles_model } from "@/constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Label } from "../ui/label";
import GetShopName from "@/action/shop/GetShopName";
import clsx from "clsx";
import { useState } from "react";
import GetCurrentUser from "@/action/auth/GetCurrentUser";

const formSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required",
  }),
  model: z.string().nonempty({
    message: "Model is required",
  }),
  vehicle_class: z.string().nonempty({
    message: "Vehicle class is required",
  }),
  vehicle_type: z
    .string()
    .nonempty({
      message: "Vehicle type is required",
    })
    .toLowerCase(),
  year: z
    .string()
    .min(4, {
      message: "Year must be a 4-digit number",
    })
    .max(4, {
      message: "Year must be a 4-digit number",
    })
    .regex(/^\d+$/, {
      message: "Year must be a positive number",
    }),
  kilometers: z.string().regex(/^\d+$/, {
    message: "Kilometers must be a positive number",
  }),
  price: z.string().regex(/^\d+$/, {
    message: "Price must be a positive number",
  }),
});

const AddVehicleModal = () => {
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const { data, isError, isLoading, mutate } = GetShopName();
  const { user } = GetCurrentUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      vehicle_class: "",
      vehicle_type: "",
      year: "",
      kilometers: "",
      price: "",
    },
  });

  const handleSelectStore = (id: string) => {
    setSelectedStoreId(id);
    console.log(id);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios
        .post("/api/vehicle", {
          ...values,
          year: parseInt(values.year),
          kilometers: parseInt(values.kilometers),
          price: parseInt(values.price),

          store_id: parseInt(selectedStoreId),
          user_email: user.session.user.email,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Vehicle added successfully");
            mutate();
          }
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a New Vehicle</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
              {data?.store?.length === 0 && (
                <p className="col-span-3 text-center text-sm text-muted">
                  You don&#39;t have any store yet. Please create a store first.
                </p>
              )}

              {data &&
                data?.store?.map((store: store) => (
                  <Label
                    key={store.id}
                    htmlFor="card"
                    onClick={() => handleSelectStore(store.id as any)}
                    className={clsx(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4",
                      (store.id as any) === selectedStoreId &&
                        "border-primary bg-primary text-primary-foreground",
                      "space-y-1.5 cursor-pointer"
                    )}
                  >
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="sr-only"
                    />
                    <Store size={32} className="mb-2" />
                    <span className="text-sm font-bold">{store.name}</span>
                  </Label>
                ))}
            </RadioGroup>
            <div className="grid grid-cols-2 gap-4 space-y-1.5 mt-2">
              {vehicles_model.map((item) => (
                <FormField
                  control={form.control}
                  name={
                    item.name as
                      | "name"
                      | "model"
                      | "vehicle_class"
                      | "vehicle_type"
                      | "year"
                      | "kilometers"
                      | "price"
                  }
                  key={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={item.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="col-span-2 flex justify-end mt-2">
              <Button type="submit" size={"full"}>
                Add Vehicle
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleModal;
