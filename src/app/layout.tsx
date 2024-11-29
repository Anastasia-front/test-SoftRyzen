import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { TextDataProvider } from "./context/TextDataContext"; // Import your context provider
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarpTravel",
  description: "Uncover Carpathian’s Secrets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://test-soft-ryzen.vercel.app/" />
      </Head>
      <body className={inter.className}>
        <TextDataProvider>{children}</TextDataProvider>
      </body>
    </html>
  );
}
