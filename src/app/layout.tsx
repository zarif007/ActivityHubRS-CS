import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Colorhydration from "@/components/Colorhydration";
import { colorSchema } from "@/lib/ColorSchema";
import { Toaster } from "@/components/ui/Toast";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Activity Hub RS",
  description: "Activity Hub RS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${colorSchema.background}`}>
      
        <GoogleAnalytics />
        <Analytics />
        <Colorhydration />
        <Toaster position="bottom-center" />
        <Navbar />
        <body>{children}</body>
    </html>
  );
}
