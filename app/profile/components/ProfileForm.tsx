"use client";

import { User } from "@/app/lib/definitions";
import {
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import UpdateButton from "./UpdateButton";
import { useFormState } from "react-dom";

export default function RegisterForm({ user }: { user: User }) {
  const toast = useToast();

  const handleUpdate = async (
    previousState: User | undefined,
    formData: FormData
  ) => {
    try {
      const submittedUsername = formData.get("username");

      await fetch("/api/user/update", {
        method: "PATCH",
        body: JSON.stringify({
          id: user.id,
          job_title: formData.get("job_title"),
          username: submittedUsername,
          previousUsername: previousState?.username,
        }),
      });

      toast({
        title: "User updated.",
        description: "We've updated your account details for you.",
        status: "success",
        isClosable: true,
      });

      if (submittedUsername !== previousState?.username) {
        signOut();
      }

      return user;
    } catch {
      toast({
        title: "Something went wrong. Please try again later.",
        status: "error",
        isClosable: true,
      });
    }
  };

  const [state, action] = useFormState(handleUpdate, user);

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
              defaultValue={state?.job_title}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              id="username"
              required
              defaultValue={state?.username}
            />
            <FormHelperText>
              Changing your username will require you to re-login.
            </FormHelperText>
          </FormControl>
          <UpdateButton></UpdateButton>
        </form>
      </CardBody>
    </Card>
  );
}
