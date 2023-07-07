import { NextAuthProvider } from "@/provider/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "@/provider/ToastProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Dealership",
  description: "Discover the most powerful vehicles for you",
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
          <main>{children}</main>
          <ToasterProvider />
        </NextAuthProvider>
      </body>
    </html>
  );
}
