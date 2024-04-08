import { Heading } from "@chakra-ui/react";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <Heading>Home</Heading>
      <Link href="/shows">View Shows</Link>
    </main>
  );
}
