"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        closeButton: {
          bg: "white",
        },
        dialog: {
          color: "black",
        },
      },
    },
  },
  styles: {
    global: {
      html: {
        bg: "rgb(71, 30, 84)",
      },
      body: {
        bg: "linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%);",
        color: "white",
      },
      a: {
        textDecoration: "underline",
      },
    },
  },
});

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );
}
