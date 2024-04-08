import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const exo2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leonardo AI Demo",
  description:
    "An auth guarded app that displays AniList open api graphql results as a demonstration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo2.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
