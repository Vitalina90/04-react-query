import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';
import { imgURL } from '../../services/movieService';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
 
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
      <li key={movie.id}>
          <div className={css.card}
            onClick={() => onSelect(movie)}
            role='button' tabIndex={0}
          >
          <img
            className={css.image}
            src={`${imgURL}${movie.poster_path}`}
            alt={movie.title}
            loading='lazy'
          />
          <h2 className={css.title}>{movie.title}</h2>
        </div>
        </li>
      ))
      }
    </ul>
  );
}
