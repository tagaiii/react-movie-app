export interface MovieResponse {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string | null;
  backdropPath: string | null;
  rating: number;
  genreIds: number[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Paginated<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}
