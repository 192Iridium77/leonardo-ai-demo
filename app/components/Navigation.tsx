import { getServerSession } from "next-auth";
import { Box, Flex } from "@chakra-ui/react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navigation() {
  const session = await getServerSession();

  return session ? (
    <Box position="relative">
      <Flex
        justifyContent="space-between"
        py={4}
        alignItems="center"
        position="absolute"
        width="100%"
      >
        <Flex gap={4}>
          <Link href="/">Home</Link>
          <Link href="/shows">Shows</Link>
        </Flex>
        <Flex gap={4} alignItems="center">
          <Link href="/profile">View Profile</Link>
          <LogoutButton></LogoutButton>
        </Flex>
      </Flex>
    </Box>
  ) : null;
}
