import useSWR from "swr";

export default function GetCurrentUser() {
  const { data, error } = useSWR("/api/session", (url) =>
    fetch(url).then((res) => res.json())
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
