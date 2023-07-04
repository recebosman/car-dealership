"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { vehicles_model } from "@/constants";
import axios from "axios";
import { toast } from "react-hot-toast";

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
  vehicle_type: z.string().nonempty({
    message: "Vehicle type is required",
  }),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/vehicle", values);
      toast.success("Vehicle added successfully");
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
        <DialogHeader>
          <DialogTitle>Add a new vehicle</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-4"
              >
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

                <div className="col-span-2 flex justify-end">
                  <Button type="submit" size={"full"}>
                    Add Vehicle
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleModal;
