"use client";

import { Spinner } from "@chakra-ui/react";
import ProfileForm from "./components/ProfileForm";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../lib/definitions";

function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function getUser() {
      const session = await getSession();

      if (session) {
        setUser(session.user as User); // TODO fix session user type
      } else {
        router.push("/login");
        router.refresh();
      }
    }
    getUser();
  }, [router]);

  return (
    <main>{user ? <ProfileForm user={user} /> : <Spinner></Spinner>}</main>
  );
}

export default ProfilePage;
