"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  const handleRegistration = async (
    previousState: string | undefined,
    formData: FormData
  ) => {
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log("🚀 ~ LoginForm ~ response:", response);
  };

  const [errorMessage, action] = useFormState(handleRegistration, undefined);

  const { pending } = useFormStatus();

  return (
    <Container>
      <Card>
        <CardBody>
          <form action={action}>
            <Heading as="h1" size="xl">
              Welcome
            </Heading>
            <Text mt={4}>
              Please fill in your details to login or create an account below.
            </Text>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input name="username" id="username" required />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                id="password"
                required
                minLength={6}
              />
            </FormControl>
            <Button aria-disabled={pending} type="submit" width="100%" mt={4}>
              Log in
            </Button>
            <Box mt={4} aria-live="polite" aria-atomic="true">
              {errorMessage ? (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              ) : null}
            </Box>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
