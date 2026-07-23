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
  metadataBase: new URL("https://ramadhan-ghazy-portfolio.sites.openai.com"),
  title: {
    default: "Ramadhan Ghazy Henanto — AI-assisted web builder",
    template: "%s — Ramadhan Ghazy Henanto",
  },
  description:
    "Web apps, dashboards, and automation built with AI assistance, verified with real tests and careful human review.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Ramadhan Ghazy Henanto — AI-assisted web builder",
    description: "Useful software, careful verification, clear handoff.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
