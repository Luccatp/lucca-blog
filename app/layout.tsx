import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lucca's Blog",
  description: "Uma aplicação de blog feita com Next.js e TailwindCSS 🚀",
  icons: [
    {
      href: "/lucca.jpg",
      url: "/lucca.jpg",
      sizes: "80x160",
      type: "image/jpg",
      rel: "icon",
    },
  ],
  creator: "Lucca Paradeda",
  authors: [{ name: "Lucca Paradeda" }],
  keywords: [
    "Lucca Paradeda",
    "Lucca",
    "Paradeda",
    "Programming",
    "Programação",
    "blog",
    "Desenvolvimento",
    "Development",
    "Web",
    "Web Development",
    "Desenvolvimento Web",
    "Frontend",
    "Frontend Development",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-gray-900 dark:selection:bg-gray-600 dark:text-white h-full selection:bg-gray-200`}
      >
        <Providers>
          <Navbar />
          <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
