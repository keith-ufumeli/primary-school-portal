import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { MainLoaderProvider } from "@/components/ui/MainLoader";
import { NavigationProvider } from "@/components/providers/NavigationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Primary School Portal",
  description: "School management system for primary schools",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <MainLoaderProvider>
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </MainLoaderProvider>
      </body>
    </html>
  );
}