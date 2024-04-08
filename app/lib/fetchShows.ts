import { gql } from "@apollo/client";
import createApolloClient from "@/app/lib/apollo-client";

export async function fetchShows({
  currentPage,
  id,
}: {
  currentPage?: number;
  id?: string;
}) {
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
        perPage: 20,
        isAdult: false,
      },
    });

    return {
      pageInfo: response.data.Page.pageInfo,
      shows: response.data.Page.media,
    };
  } catch (err) {
    // 404?
    // 500?
    throw new Error(err);
  }
}
