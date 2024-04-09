import { gql } from "@apollo/client";
import createApolloClient from "@/app/lib/apollo-client";
import { Show, PageInfo } from "./definitions";

// the anilist graphql is currently returning broken values for total results and lastpage
export const TOTAL_RESULTS = 11302;

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export async function fetchShows({
  currentPage,
  id,
}: {
  currentPage: number;
  id?: string;
}): Promise<{ shows?: Show[]; pageInfo?: PageInfo; error?: any }> {
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

    if (response.networkStatus === 8)
      throw new Error(
        "No request is in flight for this query, but one or more errors were detected."
      );

    if (currentPage > TOTAL_RESULTS || currentPage < 0)
      throw new NotFoundError("Page not found.");

    return {
      pageInfo: response.data.Page.pageInfo,
      shows: response.data.Page.media,
    };
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      return {
        error,
      };
    }
    throw error;
  }
}
