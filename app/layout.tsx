import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import { Providers } from "./providers";
import Navigation from "./components/Navigation";
import { Box, Container } from "@chakra-ui/react";
import { Session } from "next-auth";

const exo2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leonardo AI Demo",
  description:
    "An auth guarded app that displays AniList open api graphql results as a demonstration.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    session: Session;
  };
}>) {
  return (
    <html lang="en">
      <body className={exo2.className}>
        <Providers session={params.session}>
          <Container maxW="4xl" minHeight="100vh">
            <Navigation />
            <Box pt={16}>{children}</Box>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
