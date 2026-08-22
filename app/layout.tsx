import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Md Alamgir Hossen — Senior WordPress & Next.js Developer",
  description:
    "Senior WordPress & Next.js developer with 9+ years of experience. Custom themes with ACF, plugin & Elementor widget development, WooCommerce, Shopify, headless WordPress with WPGraphQL, and full-stack Next.js applications.",
  keywords: [
    "WordPress Developer",
    "Next.js Developer",
    "Headless WordPress",
    "WooCommerce Developer",
    "Elementor Widget Development",
    "WPGraphQL",
    "Shopify Developer",
    "Dhaka Bangladesh",
  ],
  authors: [{ name: "Md Alamgir Hossen" }],
  openGraph: {
    title: "Md Alamgir Hossen — Senior WordPress & Next.js Developer",
    description:
      "From pixel-perfect WordPress themes to headless Next.js platforms — 9+ years of building fast, scalable websites that grow businesses.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
