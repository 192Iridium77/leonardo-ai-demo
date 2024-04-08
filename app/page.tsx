import { Heading, Text } from "@chakra-ui/react";

export default async function Home() {
  return (
    <main>
      <Heading my={4}>Home</Heading>
      <Text>
        This is a demo project, built using Next.js, GraphQL apollo, PosgreSQL
        and Chakra UI.
      </Text>
      <Text>It has been deployed on a free tier Vercel.</Text>
    </main>
  );
}
