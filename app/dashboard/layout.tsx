import Navbar from "@/components/navbar/Navbar";
import { SWRProvider } from "@/provider/SwrProvider";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SWRProvider>
        <Navbar />
        <main>{children}</main>
      </SWRProvider>
    </>
  );
}
