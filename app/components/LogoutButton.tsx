"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}
