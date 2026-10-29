import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EFEBE2",
};

export const metadata: Metadata = {
  title: "Alex Madrazo — Value-driven agentic systems",
  description:
    "Governable, scalable agentic systems. I learn the need, find where the value is, and challenge the process. Madrid.",
  metadataBase: new URL("https://amadrazo.dev"),
  openGraph: {
    title: "Alex Madrazo — Value-driven agentic systems",
    description:
      "Value-driven. Governable. Built to scale. Madrid.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
      {/* Set NEXT_PUBLIC_GA_ID (see .env.production) to enable visitor analytics. */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
