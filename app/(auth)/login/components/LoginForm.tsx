"use client";

import {
  Box,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { SignInResponse, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = async (
    previousState: SignInResponse | undefined,
    formData: FormData
  ) => {
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      router.push("/shows");
      router.refresh();
    }

    return response;
  };

  const [state, action] = useFormState(handleLogin, undefined);

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
            {!!state?.error ? (
              <Box mt={4} aria-live="polite" aria-atomic="true" color="crimson">
                Incorrect username or password. Please try again.
              </Box>
            ) : null}
            <LoginButton></LoginButton>
            <Box textAlign="center" mt={4}>
              <Link href="/register">Create a new account</Link>
            </Box>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
