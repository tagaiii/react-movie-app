import { config } from '../config';
import type { MovieResponse } from '../types';

const fetchMovies = async () => {
  const res = await fetch(`${config.BASE_URL}/movie/popular`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.API_KEY}`,
    },
  });
  const data: MovieResponse = await res.json();
  return data.results;
};

const searchMovies = async (query: string) => {
  if (query.trim() === '') {
    return [];
  }
  const res = await fetch(
    `${config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=1`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
      },
    }
  );
  const data: MovieResponse = await res.json();
  return data.results;
};

const fetchMovieImageURL = (path: string) => {
  return `${config.IMAGE_URL}${path}`;
};

export const apiService = {
  fetchMovies,
  searchMovies,
  fetchMovieImageURL,
};
