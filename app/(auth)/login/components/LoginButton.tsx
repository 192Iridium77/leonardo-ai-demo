"use client";

import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      isLoading={pending}
      aria-disabled={pending}
      type="submit"
      width="100%"
      mt={4}
    >
      Log in
    </Button>
  );
}
