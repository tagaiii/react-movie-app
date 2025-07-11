import { Component } from 'react';
import type { Movie } from '../types';

interface Props {
  query: string;
  results: Movie[];
}

class Results extends Component<Props> {
  render() {
    const { query, results } = this.props;

    if (query && results.length !== 0) {
      return (
        <div className="bg-gray-100 min-h-100 flex items-center justify-center">
          <header className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
            <h1>Search Results for "{query}"</h1>
            {results.length > 0 ? (
              <ul className="mt-4">
                {results.map((movie) => (
                  <li key={movie.id} className="mb-2">
                    <h2 className="text-lg font-semibold">{movie.title}</h2>
                    <p>{movie.overview}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found {query}</p>
            )}
          </header>
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
