import ShowCard from "./components/ShowCard";
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { fetchShows } from "../lib/fetchShows";
import Pagination from "./components/Pagination";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TOTAL_RESULTS } from "@/app/lib/fetchShows";

export default async function Shows({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const currentPage = Number(searchParams?.page) || 1;
  const { shows, error } = await fetchShows({ currentPage });

  return (
    <section>
      <Heading my={4}>Shows</Heading>
      {!error && shows ? (
        <>
          <VStack>
            <SimpleGrid minChildWidth="400px" spacing={8}>
              {shows.map((show) => (
                <div key={show.id}>
                  <ShowCard show={show}></ShowCard>
                </div>
              ))}
            </SimpleGrid>
          </VStack>
          <Box width="100%">
            <Pagination totalPages={TOTAL_RESULTS}></Pagination>
          </Box>
        </>
      ) : (
        <Box>
          <Text mb={4} color="red.600">
            {error?.message}
          </Text>
          <Link href="/shows">Back to Shows</Link>
        </Box>
      )}
    </section>
  );
}
