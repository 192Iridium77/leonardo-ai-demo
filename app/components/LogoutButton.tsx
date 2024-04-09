"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  async function handleLogout() {
    setLoading(true);
    await signOut();
    setLoading(false);
  }

  return (
    <Button isLoading={loading} aria-disabled={loading} onClick={handleLogout}>
      Logout
    </Button>
  );
}
