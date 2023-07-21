import useFilterStore from "@/store/useFilterStore";
import useSearchStore from "@/store/useSearchStore";
import { Vehicles } from "@prisma/client";
import useSWR from "swr";

export default function GetVehicles() {
  const { search } = useSearchStore();
  const { vehicleType } = useFilterStore();

  let endpoint = "/api/vehicle";

  if (search && vehicleType) {
    endpoint = `/api/vehicle?name=${search}&vehicle_type=${vehicleType}`;
  } else if (search) {
    endpoint = `/api/vehicle?name=${search}`;
  } else if (vehicleType) {
    endpoint = `/api/vehicle?vehicle_type=${vehicleType}`;
  }

  const { data, error, isLoading, mutate } = useSWR<Vehicles[], unknown>(
    endpoint,
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
              if (jsonData?.vehicles?.length === 0) {
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
        }, 500);
      })
  );

  if (data && data.length === 0) {
    useSearchStore.setState({ isDataNotFound: false });
  }

  return {
    data: data || ([] as any),
    isError: error,
    isLoading,
    mutate,
  };
}
