import type { Metadata } from "next";
import { Montserrat, Cairo } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "domi - General Business Agency",
  description: "Domi is a general business agency specialized in consulting, marketing, and digital development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${cairo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
