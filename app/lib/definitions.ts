export interface User {
  id: number;
  job_title: string;
  username: string;
  password: string;
}

interface ShowTitle {
  romaji: string;
}

interface CoverImage {
  extraLarge: string;
  medium: string;
}

export interface Show {
  id: number;
  bannerImage?: string;
  description: string;
  title: ShowTitle;
  coverImage: CoverImage;
}

export interface PageInfo {
  total: number;
}
