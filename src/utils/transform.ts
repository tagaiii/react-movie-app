import type {
  Movie,
  MovieResponse,
  Paginated,
  PaginatedResponse,
} from '@types';

export const mapMovie = (response: MovieResponse): Movie => {
  return {
    id: response.id,
    title: response.title,
    overview: response.overview,
    releaseDate: response.release_date,
    posterPath: response.poster_path,
    backdropPath: response.backdrop_path,
    rating: response.vote_average,
    genreIds: response.genre_ids,
  };
};

export const mapPaginatedResponse = <T, U>(
  response: PaginatedResponse<T>,
  mapFn: (item: T) => U
): Paginated<U> => {
  return {
    page: response.page,
    results: response.results.map(mapFn),
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
};
