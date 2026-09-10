import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aitechforyou.com"),
  title: { default: "AI Tech For You", template: "%s | AI Tech For You" },
  description: "Technology explained through simple mental models, practical examples, and honest learning notes.",
  openGraph: {
    title: "AI Tech For You",
    description: "Complex technology, made clear.",
    url: "https://aitechforyou.com",
    siteName: "AI Tech For You",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${outfit.variable} ${workSans.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
