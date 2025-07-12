import { Component } from 'react';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface Props {
  query: string;
  results: Movie[];
}

class Results extends Component<Props> {
  render() {
    const { query, results } = this.props;

    if (query) {
      return (
        <div className="bg-gray-100 flex flex-col p-4">
          <h1 className="text-xl font-bold">Search Results for "{query}"</h1>
          <hr />
          {results.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {results.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          ) : (
            <p>No results found {query}</p>
          )}
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 min-h-100 flex items-center justify-center self-stretch">
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
