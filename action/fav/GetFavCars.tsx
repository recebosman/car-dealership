import { useEffect } from "react";
import useSWR from "swr";
import GetCurrentUser from "../auth/GetCurrentUser";

export default function GetFavCar() {
  const { user } = GetCurrentUser();
  const email = user?.session?.user?.email;
  const { data, error, isLoading } = useSWR(`/api/fav?email=${email}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {}, [data, error, isLoading]);

  return { data, error, isLoading };
}
