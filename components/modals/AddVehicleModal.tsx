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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Store } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  fuel_type,
  vehicle_class,
  vehicles_model,
  vehicles_type,
} from "@/constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Label } from "../ui/label";
import GetShopName from "@/action/shop/GetShopName";
import clsx from "clsx";
import { useState } from "react";
import GetCurrentUser from "@/action/auth/GetCurrentUser";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required",
  }),
  model: z.string().nonempty({
    message: "Model is required",
  }),
  vehicle_class: z.string({
    required_error: "Please select a vehicle class to display.",
  }),
  vehicle_type: z
    .string({
      required_error: "Please select a vehicle type to display.",
    })
    .nonempty({
      message: "Vehicle type is required",
    }),
  year: z.string({
    required_error: "Please select a year to display.",
  }),
  kilometers: z.string().regex(/^\d+$/, {
    message: "Kilometers must be a positive number",
  }),
  price: z.string().regex(/^\d+$/, {
    message: "Price must be a positive number",
  }),
  fuel_type: z
    .string({
      required_error: "Please select a fuel type to display.",
    })
    .nonempty({
      message: "Fuel type is required",
    }),
});

const AddVehicleModal = () => {
  const [loading, setLoading] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const { data, mutate } = GetShopName();
  const { user } = GetCurrentUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSelectStore = (id: string) => {
    setSelectedStoreId(id);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const combinedValues = {
        ...values,
        year: parseInt(values.year),
        kilometers: parseInt(values.kilometers),
        price: parseInt(values.price),
        store_id: selectedStoreId,
        user_email: user.session.user.email,
      };

      setLoading(true);
      if (!selectedStoreId) {
        toast.error("Please select a store first");
        return;
      }
      const response = await axios
        .post("/api/vehicle", {
          ...combinedValues,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Vehicle added successfully");
            mutate();
            form.reset;
            setLoading(false);
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
              {data?.store?.length === 0 ? (
                <p className="col-span-3 text-center text-sm font-semibold text-red-500">
                  You don&#39;t have any store yet. Please create a store first.
                  <span>
                    <Link href="/dashboard/store">
                      <s className="text-primary"> Create a store</s>
                    </Link>
                  </span>
                </p>
              ) : (
                data &&
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
                ))
              )}
            </RadioGroup>
            <div className="grid grid-cols-2 gap-4 space-y-1.5">
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
                      | "fuel_type"
                  }
                  key={item.name}
                  render={({ field }) =>
                    item.name === "vehicle_type" ? (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={item.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicles_type.map((item) => (
                              <SelectItem key={item.label} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    ) : item.name === "fuel_type" ? (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={item.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fuel_type.map((item) => (
                              <SelectItem key={item.label} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    ) : item.name === "vehicle_class" ? (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={item.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicle_class.map((item) => (
                              <SelectItem key={item.label} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    ) : (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={item.placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                />
              ))}
            </div>

            <div className="col-span-2 flex justify-end mt-4">
              <Button disabled={loading} type="submit" size={"full"}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Add Vehicle"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleModal;
