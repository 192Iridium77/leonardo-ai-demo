import { Box, Flex } from "@chakra-ui/react";

export const metadata = {
  title: "Leonardo AI | Authentication Steps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box>
      <Flex
        justifyContent="center"
        alignItems={{ base: "normal", md: "center" }}
        py={8}
      >
        {children}
      </Flex>
    </Box>
  );
}
