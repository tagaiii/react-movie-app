import type { MovieResponse, PaginatedResponse } from '@types';
import { httpClient } from '../http-client';
import { mapMovie, mapPaginatedResponse } from '../../utils/transform';
import { config } from '@config';

const EMPTY_MOVIE_RESPONSE = {
  page: 0,
  results: [],
  totalPages: 0,
  totalResults: 0,
};

export const moviesApi = {
  fetchMovies: async () => {
    const res = await httpClient.get<PaginatedResponse<MovieResponse>>(
      '/movie/popular?page=1'
    );
    return mapPaginatedResponse(res, mapMovie);
  },

  searchMovies: async (query: string) => {
    if (query.trim() === '') {
      return EMPTY_MOVIE_RESPONSE;
    }
    const res = await httpClient.get<PaginatedResponse<MovieResponse>>(
      `/search/movie?query=${encodeURIComponent(query)}&page=1`
    );

    if (!res || res.results.length === 0) {
      return EMPTY_MOVIE_RESPONSE;
    }

    return mapPaginatedResponse(res, mapMovie);
  },

  fetchMovieImageURL: (path: string) => {
    return `${config.IMAGE_URL}${path}`;
  },
};
