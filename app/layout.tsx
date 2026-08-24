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
  metadataBase: new URL("https://www.alamgirhossen.online"),
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
    url: "https://www.alamgirhossen.online",
    siteName: "Md Alamgir Hossen",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Md Alamgir Hossen — Senior WordPress & Next.js Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Alamgir Hossen — Senior WordPress & Next.js Developer",
    description:
      "I convert slow WordPress sites into headless Next.js frontends. 9+ years, 100+ projects.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
