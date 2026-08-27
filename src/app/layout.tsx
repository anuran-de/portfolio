import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MetaBar } from "@/components/chrome/meta-bar";
import { DocRail } from "@/components/chrome/doc-rail";
import { AssistantConsole } from "@/components/assistant/terminal-chat";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Clash Display — self-hosted variable font (Fontshare), DESIGN.md §3
const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anuran.de"),
  title: "Anuran De — Data & ML Engineer",
  description:
    "Data & ML engineer at A.P. Moller–Maersk. Real-time pipelines moving 12M+ shipping records a day across 30+ terminals, and the ML systems that make sense of them.",
  authors: [{ name: "Anuran De" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anuran De — Data & ML Engineer",
    description:
      "Real-time pipelines moving 12M+ shipping records a day across 30+ terminals — and the ML systems that make sense of them.",
    url: "https://anuran.de",
    siteName: "Anuran De",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuran De — Data & ML Engineer",
    description:
      "Real-time pipelines moving 12M+ shipping records a day — and the ML systems that make sense of them.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        {/* Fixed film-grain paper texture (§4) */}
        <div className="grain" aria-hidden="true" />

        {/* Document chrome (§5) */}
        <MetaBar />
        <DocRail />

        {/* Lenis weighted smooth-scroll takes over the page (§7.1) */}
        <SmoothScroll>{children}</SmoothScroll>

        {/* ask.anuran — console assistant, launcher + overlay */}
        <AssistantConsole />

        {/* Privacy-friendly page-view analytics (Vercel) */}
        <Analytics />
      </body>
    </html>
  );
}
