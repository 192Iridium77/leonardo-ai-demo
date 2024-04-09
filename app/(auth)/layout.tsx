import { Flex } from "@chakra-ui/react";

export const metadata = {
  title: "Leonardo AI | Authentication Steps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Flex
        justifyContent="center"
        alignItems={{ base: "normal", md: "center" }}
        minHeight="80vh"
        my={8}
      >
        {children}
      </Flex>
    </section>
  );
}
