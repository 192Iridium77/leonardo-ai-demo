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
      <Flex justifyContent="center" alignItems="center" minHeight="90vh">
        {children}
      </Flex>
    </section>
  );
}
