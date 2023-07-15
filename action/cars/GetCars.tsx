import useSWR from "swr";

export default function GetVehicles() {
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/vehicle", (url) => fetch(url).then((res) => res.json()));

  return {
    data,
    isError: error,
    isLoading,
    mutate,
  };
}
