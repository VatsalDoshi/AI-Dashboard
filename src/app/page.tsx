import { db } from "@/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { index } from "drizzle-orm/mysql-core";
import Link from "next/link";
import { getMyImages } from "@/server/queries";
import Image from "next/image";
import GenericChatbot from "@/components/generic_chatbot/generic_chatbot"

export const dynamic = "force-dynamic";

async function Images() {
    const images = await getMyImages();

    
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {images.map((image) => (
            <div key={image.id } className="h-56 w-56 flex flex-col gap-2 bg-white p-4 rounded-lg hover:shadow-lg duration-300 text-black text-sm">
              <Link href={'/img/${image.id}'}>
                <Image 
                  src={image.url} 
                  alt={image.name} 
                  width={400} 
                  height={400} 
                  style={{ objectFit: 'contain' }} // Use style instead of objectFit
                />
              </Link>
              <div className="text-center font-semibold">{image.name}</div>
            </div>
          ))}
        </div>
      );
}

export default async function HomePage() {
    return (
        // <main>
        //     <GenericChatbot/>
        // </main>
        <main className="">
            <SignedOut>
                <div className="h-full w-full text-center text-2xl">
                    Please Sign In
                </div>
            </SignedOut>
            <SignedIn>
                <Images />
            </SignedIn>
        </main>
    );
}

