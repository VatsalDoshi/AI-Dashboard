import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import "@uploadthing/react/styles.css";
import Sidebar from "@/components/Sidebar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { TopNav } from "./_components/topnav";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

// Fonts
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clab AI Assignment",
  description: "Generated by Vatsal Doshi",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, "font-sans w-screen h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300")}>
          <div className="flex flex-col h-screen">
            <TopNav />

            <div className="flex flex-1 overflow-hidden">
              <Sidebar  />

              <main className="flex-grow overflow-y-auto p-4">
                {children}
              </main>
            </div>
          </div>
          
          <div id="modal-root" />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
