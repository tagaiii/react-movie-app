import { Component } from 'react';
import type { Movie } from '../types';

interface Props {
  query: string;
  results: Movie[];
}

class Results extends Component<Props> {
  getMovieImageUrl = (path: string) => {
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  render() {
    const { query, results } = this.props;

    if (query && results.length !== 0) {
      return (
        <div className="bg-gray-100 min-h-100 flex flex-col items-center justify-center">
          <h1>Search Results for "{query}"</h1>
          {results.length > 0 ? (
            <ul className="mt-4 flex flex-col items-center w-[400px]">
              {results.map((movie) => (
                <li
                  key={movie.id}
                  className="mb-2 p-4 flex flex-col items-center border rounded-lg bg-white shadow-md w-full"
                >
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p>{movie.overview}</p>
                  <img
                    src={this.getMovieImageUrl(movie.poster_path || '')}
                    alt={`${movie.title} poster`}
                    className="mt-2 rounded"
                    style={{ width: '150px', height: '225px' }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found {query}</p>
          )}
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 min-h-100 flex items-center justify-center">
          <header className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
            <h1>Search for a movie</h1>
            <p className="mt-4">Enter a query to see results.</p>
          </header>
        </div>
      );
    }
  }
}

export default Results;
