import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import AppProviders from "@/providers/AppProviders";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Loam & Co. | Traceable Specialty Coffee Subscription",
  description:
    "Always fresh, traceable to the farm, roasted in small batches. Experience curated single-origin coffee on your schedule.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <AppProviders>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
