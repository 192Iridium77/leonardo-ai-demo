"use client";

import { Spinner } from "@chakra-ui/react";
import ProfileForm from "./components/ProfileForm";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
      const session = await getSession();

      if (!session?.user) {
        router.push("/login");
        router.refresh();
      }

      setUser(session.user);
    }
    getUser();
  }, [router]);

  return (
    <main>{user ? <ProfileForm user={user} /> : <Spinner></Spinner>}</main>
  );
}

export default ProfilePage;
