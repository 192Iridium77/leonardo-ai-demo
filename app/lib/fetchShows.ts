import { gql } from "@apollo/client";
import createApolloClient from "@/app/lib/apollo-client";
import { Show, PageInfo } from "./definitions";

export async function fetchShows({
  currentPage,
  id,
}: {
  currentPage?: number;
  id?: string;
}): Promise<{ shows: Show[]; pageInfo: PageInfo }> {
  const client = createApolloClient();

  try {
    const response = await client.query({
      query: gql`
        query (
          $id: Int
          $page: Int
          $perPage: Int
          $search: String
          $isAdult: Boolean
        ) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media(id: $id, search: $search, isAdult: $isAdult) {
              id
              title {
                romaji
              }
              coverImage {
                color
                extraLarge
                medium
              }
              bannerImage
              description
              isAdult
            }
          }
        }
      `,
      variables: {
        id,
        page: currentPage,
        perPage: 8,
        isAdult: false,
      },
    });

    return {
      pageInfo: response.data.Page.pageInfo,
      shows: response.data.Page.media,
    };
  } catch (err) {
    throw err;
  }
}
