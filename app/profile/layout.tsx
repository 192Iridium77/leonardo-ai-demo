import { Flex } from "@chakra-ui/react";

export const metadata = {
  title: "Leonardo AI | Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Flex
        justifyContent={{ base: "normal", md: "center" }}
        alignItems={{ base: "normal", md: "center" }}
        minHeight="100vh"
      >
        {children}
      </Flex>
    </section>
  );
}
