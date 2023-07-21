"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import browserImageCompression from "browser-image-compression";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";

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
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Store, X } from "lucide-react";

import {
  fuel_type,
  vehicle_class,
  vehicles_model,
  vehicles_type,
} from "@/constants";

import GetShopName from "@/action/shop/GetShopName";
import GetCurrentUser from "@/action/auth/GetCurrentUser";
import Image from "next/image";

const vehicleFormSchema = z.object({
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

const fileTypes = ["JPG", "JPEG", "PNG"];

const AddVehicleModal = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState<any[]>([]);

  const [selectedStoreId, setSelectedStoreId] = useState("");
  const { data, mutate } = GetShopName();
  const { user } = GetCurrentUser();

  const form = useForm<z.infer<typeof vehicleFormSchema>>({
    resolver: zodResolver(vehicleFormSchema),
  });

  const handleSelectStoreById = useCallback((storeId: string) => {
    setSelectedStoreId(storeId);
  }, []);

  const handleFileSelection = (filesObject: string) => {
    const files = Object.values(filesObject);
    setFile(files.map((file) => file) as any);

    if (selectedPhotos.length + files.length > 2) {
      toast.error("You can only upload up to 2 photos");
      return;
    }

    setSelectedPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const uploadImages = async (uploadedImages: any) => {
    if (selectedPhotos.length === 0) return;

    try {
      const compressedImages = await Promise.all(
        selectedPhotos.map((photo) =>
          browserImageCompression(photo, {
            maxSizeMB: 0.06,
            maxWidthOrHeight: 600,
          })
        )
      );

      const uploadPromises = compressedImages.map((compressedPhoto) => {
        const imageRef = ref(
          storage,
          `images/${user.session.user.email}/${data.store
            ?.find((store: any) => store.id === selectedStoreId)
            ?.name.toLowerCase()}/${uuidv4()}`
        );

        return uploadBytes(imageRef, compressedPhoto).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      });

      const urls = await Promise.all(uploadPromises);
      uploadedImages(urls);
    } catch (error) {
      console.log(error);
    }

    setSelectedPhotos([]);
  };

  async function onSubmit(values: z.infer<typeof vehicleFormSchema>) {
    try {
      const formValues = form.getValues();

      const combinedValues = {
        ...formValues,
        year: parseInt(values.year),
        kilometers: parseInt(values.kilometers),
        price: parseInt(values.price),
        store_id: selectedStoreId,
        user_email: user.session.user.email,
        images: [],
      };

      setLoading(true);
      if (!selectedStoreId) {
        toast.error("Please select a store first");
        setLoading(false);
        return;
      }

      const uploadedImages = (images: any) => {
        combinedValues.images = images;
        axios
          .post("/api/vehicle", {
            ...combinedValues,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Vehicle added successfully");
              mutate();
              form.reset();
              setLoading(false);
            }
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      };

      await uploadImages(uploadedImages);
      setInterval(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemove = (file: string) => {
    setSelectedPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo !== file)
    );
  };

  const hasStores = data?.store?.length === 0;

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
            <RadioGroup
              defaultValue="card"
              className="grid grid-cols-3 gap-4 pb-4"
            >
              {hasStores ? (
                <p className="col-span-3 text-center text-sm font-semibold text-red-500 ">
                  You don&#39;t have any store yet. Please create a store first.
                  <Link href="/dashboard/store">
                    <Button variant={"link"} className="text-primary">
                      {" "}
                      Create a store
                    </Button>
                  </Link>
                </p>
              ) : (
                data &&
                data?.store?.map((store: store) => (
                  <Label
                    key={store.id}
                    htmlFor="card"
                    onClick={() => handleSelectStoreById(store.id as any)}
                    className={clsx(
                      "flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-popover p-4 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out",
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
                  name={item.name as any}
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
            <div className="mt-4 space-y-4">
              <FileUploader
                handleChange={handleFileSelection}
                selectedFiles={selectedPhotos}
                handleDelete={handleRemove}
                name="file"
                types={fileTypes}
                label="Upload Vehicle Image (Max 2)"
                multiple
                required
                disabled={selectedPhotos.length >= 2}
                className="col-span-2"
              />
              <div className="grid grid-cols-3 gap-4 mt-4">
                {selectedPhotos.length > 0 &&
                  selectedPhotos.map((photo) => (
                    <div
                      key={photo.name}
                      className="flex items-center justify-between relative"
                    >
                      <Image
                        src={URL.createObjectURL(photo)}
                        alt="Selected Vehicle Image"
                        width={150}
                        height={150}
                        className="rounded-md"
                      />
                      <Button
                        className="absolute top-0 right-0 hover:text-red-600 text-white
                       bg-black bg-opacity-50 
                      "
                        onClick={() => handleRemove(photo)}
                        type="button"
                        variant="link"
                        size="icon"
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
              </div>
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
