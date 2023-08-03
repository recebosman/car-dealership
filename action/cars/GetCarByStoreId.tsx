"use client";
import { useEffect } from "react";
import useSWR from "swr";

export default function GetCarByStoreId({ id }: { id: number }) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/store?id=${id}`,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {}, [data, error, isLoading]);

  return { data, error, isLoading, mutate };
}
