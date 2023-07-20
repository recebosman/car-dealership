import useSearchStore from "@/store/useSearchStore";
import { Vehicles } from "@prisma/client";
import useSWR from "swr";

export default function GetVehicles() {
  const { search } = useSearchStore();

  const { data, error, isLoading, mutate } = useSWR<Vehicles[], unknown>(
    `/api/vehicle?name=${search}`,
    (url) =>
      new Promise<Vehicles[]>((resolve) => {
        setTimeout(() => {
          fetch(url)
            .then((res) => {
              if (!res.ok) {
                throw new Error("Failed to fetch data.");
              }
              return res.json();
            })
            .then((jsonData) => {
              if (jsonData?.length === 0) {
                useSearchStore.setState({ isDataNotFound: true });
              } else {
                useSearchStore.setState({ isDataNotFound: false });
              }

              resolve(jsonData);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              resolve([]);
            });
        }, 1000);
      })
  );

  return {
    data: data || ([] as any),
    isError: error,
    isLoading,
    mutate,
  };
}
