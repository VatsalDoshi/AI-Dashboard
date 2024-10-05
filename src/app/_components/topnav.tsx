"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
    const router = useRouter();
    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <div className="justify-center text-center"></div>
            <div className="flex flex-row items-center gap-4">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    {/* <UploadButton endpoint="imageUploader" className="bg-white text-blue-500 font-semibold py-3 px-6 rounded hover:bg-gray-200 transition duration-300 ease-in-out" onClientUploadComplete={() =>{
                        router.refresh();
                    }} />      */}
                    <SimpleUploadButton />
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}