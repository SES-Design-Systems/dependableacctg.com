import type { Metadata } from "next";
import { Joan, Noto_Sans } from "next/font/google";
import "./globals.css";

const joan = Joan({
  variable: "--font-joan",
  subsets: ["latin"],
  weight: "400",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dependable Accounting Co.",
  description: "Personal and business tax preparation and accounting services, located in Tottenville, Staten Island, NY.",
  verification: {
    google: "PBBFtBWVxob8h3KT2Rjq83To5eSb7Fu_31nG85_6foI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${joan.variable} ${notoSans.variable} antialiased bg-[url('/background.svg')] min-h-screen bg-cover`}
      >
        {children}
      </body>
    </html>
  );
}
