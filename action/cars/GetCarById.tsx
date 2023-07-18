import { useEffect } from "react";
import useSWR from "swr";

export default function GetCarById({ id }: { id: number }) {
  const { data, error, isLoading } = useSWR(`/api/vehicle?id=${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {}, [data, error, isLoading]);

  return { data, error, isLoading };
}
