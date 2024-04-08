"use client";

import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

import { useFormState, useFormStatus } from "react-dom";

export default function RegisterForm({ user }) {
  const handleUpdate = async (previousState: any, formData: FormData) => {
    const submittedUsername = formData.get("username");

    const response = await fetch("/api/user/update", {
      method: "PATCH",
      body: JSON.stringify({
        id: user.id,
        job_title: formData.get("job_title"),
        username: submittedUsername,
        previousUsername: previousState.username,
      }),
    });

    if (submittedUsername !== previousState.username) {
      signOut();
    }

    return response;
  };

  const [state, action] = useFormState(handleUpdate, user);

  const { pending } = useFormStatus();

  return (
    <Card>
      <CardBody>
        <form action={action}>
          <Heading as="h1" size="xl">
            Profile
          </Heading>
          <FormControl mt={4}>
            <FormLabel>Job Title</FormLabel>
            <Input
              name="job_title"
              id="job_title"
              required
              defaultValue={state.job_title}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              id="username"
              required
              defaultValue={state.username}
            />
            <FormHelperText>
              Changing your username will require you to re-login.
            </FormHelperText>
          </FormControl>
          <Button aria-disabled={pending} type="submit" width="100%" mt={4}>
            Update
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
