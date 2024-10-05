"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils"; // Adjust the import path if needed

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 flex-shrink-0 border-r min-h-screen px-4 py-8">
      <nav className="space-y-2">
        <Link href="/" className={cn("block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white", {
          "bg-blue-500 text-white": pathname === "/"
        })}>
          Manage Posts and Images
        </Link>
        <Link href="/chatbot-text" className={cn("block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white", {
          "bg-blue-500 text-white": pathname === "/chatbot-text"
        })}>
          Chatbot - Text
        </Link>
        <Link href="/chatbot-ui" className={cn("block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white", {
          "bg-blue-500 text-white": pathname === "/chatbot-ui"
        })}>
          Chatbot - UI
        </Link>
      </nav>
    </div>
  );
}
