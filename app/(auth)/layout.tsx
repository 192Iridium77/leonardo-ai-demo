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
      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        {children}
      </Flex>
    </section>
  );
}
