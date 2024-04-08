import ShowCard from "./components/ShowCard";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { fetchShows } from "../lib/fetchShows";
import Pagination from "./components/Pagination";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
  const { shows, pageInfo } = await fetchShows({ currentPage });

  return (
    <section>
      <Heading my={4}>Shows</Heading>
      <SimpleGrid minChildWidth="400px" spacing={8}>
        {shows
          ? shows.map((show) => (
              <div key={show.id}>
                <ShowCard show={show}></ShowCard>
              </div>
            ))
          : null}
      </SimpleGrid>
      <Box width="100%">
        <Pagination totalPages={pageInfo.total}></Pagination>
      </Box>
    </section>
  );
}
