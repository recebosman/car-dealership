"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Store } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import GetCurrentUser from "@/action/auth/GetCurrentUser";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  storeName: z
    .string()
    .min(3, {
      message: "Store Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Store Name must be at least 50 characters long",
    })
    .trim()
    .refine((value) => !/\s/.test(value), {
      message: "Store Name must not contain spaces",
    })
    .refine((value) => !/[!@#$%^&*(),.?":{}|<>]/g.test(value), {
      message: "Store Name must not contain special characters",
    }),
});

export function CreateStoreCard() {
  const { user } = GetCurrentUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);

  const warnings = [
    {
      title: "Store Name can be changed later!",
    },
    {
      title:
        "Store Name can be max 50 characters long and min 3 characters long!",
    },
    {
      title: "Don't use special characters in Store Name",
    },
    {
      title: "Don't use spaces in Store Name",
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios
        .post("/api/store", {
          name: values.storeName,
          user_email: user.session.user.email,
        })
        .then((res) => {
          toast.success("Store created successfully!");
          setIsLoading(false);
          setIsCreating((prev) => !prev);
          window.location.reload();
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.error);
        });

      return response;
    } catch (error) {
      setIsLoading(false);
      toast.error("something went wrong!");
    }
  }

  const handleCreateStore = () => {
    setIsCreating((prev) => !prev);
    form.reset();
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Create Store</CardTitle>
        <CardDescription>
          Start selling your vehicles by creating a store.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isCreating ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full items-center">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input
                            id="storeName"
                            placeholder="Name of your store"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col space-y-1.5 py-2">
                    {warnings.map((warning, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />

                        <p className="text-sm font-medium leading-2">
                          {warning.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {isCreating && (
                <CardFooter className="flex justify-between mt-4">
                  <Button
                    size={"lg"}
                    variant="destructive"
                    onClick={handleCreateStore}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isLoading}
                    size={"lg"}
                    variant="default"
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </CardFooter>
              )}
            </form>
          </Form>
        ) : (
          <>
            <h1 className="text-center font-semibold">
              Let&apos;s get started with your store!
            </h1>
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleCreateStore}
                variant={"default"}
                size={"lg"}
                className="space-x-2 flex items-center"
              >
                <Store size={24} />
                <span className="ml-2 text-lg font-semibold">Create Store</span>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
