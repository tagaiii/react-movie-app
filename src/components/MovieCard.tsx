import type { Movie } from '../types';
import { apiService } from '../services/apiService';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const maxTitleLength = 100;
  const truncatedOverview =
    movie.overview.length > maxTitleLength
      ? movie.overview.substring(0, maxTitleLength - 3) + '...'
      : movie.overview;

  return (
    <div className="flex flex-col w-[285px] justify-between items-center mb-2 border border-dashed p-2">
      <div>
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        {truncatedOverview ? (
          <p className="text-sm text-gray-700 mt-1">{truncatedOverview}</p>
        ) : (
          <p className="text-sm text-gray-700 mt-1">
            Movie has no overview available
          </p>
        )}
      </div>
      <img
        src={apiService.fetchMovieImageURL(movie.poster_path || '')}
        alt={`${movie.title} poster`}
        className="mt-2 rounded"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};
