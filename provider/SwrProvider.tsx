"use client";
import GetCurrentUser from "@/action/GetCurrentUser";
import Spinner from "@/components/ui/spinner";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export const SWRProvider = ({ children }: Props) => {
  const { isLoading, isError } = GetCurrentUser();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (isError) return <div>{isError.message}</div>;
  return <SWRConfig>{children}</SWRConfig>;
};
