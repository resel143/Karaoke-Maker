import type { Metadata } from "next";
import { Bungee, Kanit } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Karaoke Maker",
  description: "Upload mp3 and lyrics to preview karaoke output",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${bungee.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[var(--bg-base)] font-[family-name:var(--font-kanit)] text-zinc-100"
        suppressHydrationWarning
      >
        <SiteNav />
        <div className="flex min-h-full flex-col pt-16">{children}</div>
      </body>
    </html>
  );
}
