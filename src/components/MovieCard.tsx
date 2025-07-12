import type { Movie } from '../types';
import { config } from '../config';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const getMovieImageUrl = (path: string) => {
    return `${config.IMAGE_URL}${path}`;
  };

  return (
    <div className="flex flex-col w-[350px] justify-between items-center mb-2 border border-dashed p-2">
      <div>
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
      <img
        src={getMovieImageUrl(movie.poster_path || '')}
        alt={`${movie.title} poster`}
        className="mt-2 rounded"
        style={{ width: '150px', height: '225px' }}
      />
    </div>
  );
};
