import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talk_ai",
  description: "Colle l'URL d'une page web et pose tes questions à l'intelligence artificielle. Talk AI analyse le contenu et te fournit des réponses pertinentes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"  data-theme="abyss">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
