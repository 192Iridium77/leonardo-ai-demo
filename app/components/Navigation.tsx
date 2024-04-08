import { getServerSession } from "next-auth";
import { Flex } from "@chakra-ui/react";
import LogoutButton from "./LogoutButton";

export default async function Navigation() {
  const session = await getServerSession();

  return (
    <Flex justifyContent="end" my={4}>
      {session ? <LogoutButton></LogoutButton> : null}
    </Flex>
  );
}
