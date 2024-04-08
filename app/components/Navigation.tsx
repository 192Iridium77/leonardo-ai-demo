import { getServerSession } from "next-auth";
import { Flex } from "@chakra-ui/react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navigation() {
  const session = await getServerSession();

  return (
    <Flex justifyContent="space-between" py={4} alignItems="center">
      <Flex gap={4}>
        <Link href="/">Home</Link>
        <Link href="/shows">Shows</Link>
      </Flex>
      {session ? (
        <Flex gap={4} alignItems="center">
          <Link href="/profile">View Profile</Link>
          <LogoutButton></LogoutButton>
        </Flex>
      ) : null}
    </Flex>
  );
}
