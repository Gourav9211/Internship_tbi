import type { Metadata } from "next";
import { Architects_Daughter, Patrick_Hand } from "next/font/google";
import "./globals.css";

const architectsDaughter = Architects_Daughter({
  variable: "--font-doodle-title",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const patrickHand = Patrick_Hand({
  variable: "--font-doodle-body",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CounselAI - Next-Gen College Counseling & Prediction Platform",
  description: "AI-Powered College Predictions and Admission Counseling for JEE, JoSAA, CSAB, and CUET aspirants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${patrickHand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf9f6] text-[#0c0d0e]">{children}</body>
    </html>
  );
}
