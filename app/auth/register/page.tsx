"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Loader2 } from "lucide-react";
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
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { register } from "@/components/form";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Please enter your name" }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, name } = values;
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data);
        setLoading(false);

        await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });

        router.push("/dashboard");
      }

      if (response.status === 400) {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-500 p-2">
      <div className="w-full max-w-md p-6 m-auto bg-white rounded-lg shadow-md ">
        <div className="flex justify-center mx-auto flex-col text-center">
          <h2 className="text-3xl font-semibold">Car Dealership</h2>
          <p className="mt-2 text-sm font-semibold text-gray-700">
            Welcome to the Car Dealership. Please register to continue.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            {register.map((item, index) => {
              return (
                <FormField
                  control={form.control}
                  name={item.name as any}
                  key={index}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={item.placeholder}
                          {...field}
                          disabled={loading}
                          type={item.type}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <div className="mt-6">
              <Button
                variant="default"
                size="full"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Do you have an account?{" "}
          <Link href="/" className="font-medium text-gray-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
