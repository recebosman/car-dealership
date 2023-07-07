"use client";
import useSWR from "swr";
import GetCurrentUser from "../auth/GetCurrentUser";

export default function GetShopName() {
  const { user } = GetCurrentUser();
  const user_email = user.session.user.email;
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/store?email=" + user_email, (url) =>
    fetch(url).then((res) => res.json())
  );

  return {
    data,
    isError: error,
    isLoading,
    mutate,
  };
}
