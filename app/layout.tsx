import { NextAuthProvider } from "@/provider/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "@/provider/ToastProvider";
import { SWRProvider } from "@/provider/SwrProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider>
          <SWRProvider>
            <main>{children}</main>
            <ToasterProvider />
          </SWRProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
