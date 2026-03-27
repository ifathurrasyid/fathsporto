import type { Metadata } from "next";
import { Roboto, Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"; // <-- Vercel Analytics import added here

// Initialize the new fonts
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-roboto'
});

const interTight = Inter_Tight({
  weight: ['300', '400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-inter-tight'
});

export const metadata: Metadata = {
  title: "fathuri",
  description: "Portfolio of Analytics, Data Science, and Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Apply the font variables to the body */}
      <body className={`${roboto.variable} ${interTight.variable} font-roboto bg-abyss text-starlight antialiased`}>
        <Navbar />
        <main className="w-full">
          {children}
        </main>
        {/* Render Analytics at the bottom of the body */}
        <Analytics />
      </body>
    </html>
  );
}