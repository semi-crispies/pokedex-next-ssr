import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import Navigation from "@/components/Navigation";
import Image from "next/image";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Pokedex",
    description: "Project to learn nextjs SSR",
    icons: {icon: '/favicon.ico',},
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className}>

        <header className="flex justify-center py-8">
            <h1>
                <Image src="/pokelogo.svg" alt="Pokemon Logo" width={0} height={0}
                       style={{width: 'auto', height: '150px'}} priority/>
            </h1>
        </header>

        <Navigation/>

        {children}

        </body>
        </html>
    );
}
