import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "./components/Navigation";
import { Container } from "@chakra-ui/react";

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
        <Providers>
          <Container maxW="4xl">
            <Navigation />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
