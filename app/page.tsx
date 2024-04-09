import { Heading, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <main>
      <Heading py={4}>Home</Heading>
      <Text>
        This is a demo project, built using Next.js, GraphQL apollo, PosgreSQL
        and Chakra UI.
      </Text>
      <Text>It has been deployed on a free tier Vercel.</Text>
    </main>
  );
}
