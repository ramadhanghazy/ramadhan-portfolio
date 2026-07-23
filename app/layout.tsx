import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ramadhanghazy.pages.dev"),
  title: {
    default: "Ramadhan Ghazy Henanto | Software projects",
    template: "%s | Ramadhan Ghazy Henanto",
  },
  description:
    "Internal tools, dashboards, and small web applications by Ramadhan Ghazy Henanto.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Ramadhan Ghazy Henanto | Software projects",
    description: "Internal tools, dashboards, and small web applications.",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
