"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const handleRegistration = async (
    previousState: Response | undefined,
    formData: FormData
  ) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        job_title: formData.get("job_title"),
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    const body = await response.json();

    if (!body.error) {
      router.push("/shows");
      router.refresh();
    }

    return body;
  };

  const [state, action] = useFormState(handleRegistration, undefined);

  const { pending } = useFormStatus();

  return (
    <Container>
      <Card>
        <CardBody>
          <form action={action}>
            <Heading as="h1" size="xl">
              New Account
            </Heading>
            <Text mt={4}>
              Please fill in your details to create an account below.
            </Text>
            <FormControl mt={4}>
              <FormLabel>Job Title</FormLabel>
              <Input name="job_title" id="job_title" required />
            </FormControl>
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
            <Box mt={4} aria-live="polite" aria-atomic="true">
              {state?.error ? <Text color="red.600">{state.error}</Text> : null}
            </Box>
            <Button aria-disabled={pending} type="submit" width="100%" mt={4}>
              Sign Up
            </Button>
            <Flex justifyContent="center" mt={4}>
              <Link href="/login">Back to Login</Link>
            </Flex>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
