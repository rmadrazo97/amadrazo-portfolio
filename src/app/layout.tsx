import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EFEBE2",
};

export const metadata: Metadata = {
  title: "Alex Madrazo — AI into the work",
  description:
    "Lead of the AI & Engineering Studio at HazelHeartwood. Agentic systems in daily operations, from the mock-up to production, then a handover the team can run.",
  metadataBase: new URL("https://amadrazo.dev"),
  openGraph: {
    title: "Alex Madrazo — AI into the work",
    description:
      "AI that runs in the work, not a demo. Madrid. AI & Engineering Studio, HazelHeartwood.",
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
    </html>
  );
}
