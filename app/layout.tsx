import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Price-Tracker",
  description: "Web-Scrapper-Price-Tracker built using NEXT-JS 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* Emelents cannot be wider than 1440px */}
        <Navbar />
        <main className="max-w-[1440px] mx-auto">{children}</main>
      </body>
    </html>
  );
}
