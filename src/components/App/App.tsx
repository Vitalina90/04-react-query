import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSearch = async (query: string): Promise<void> => {
    setMovies([]);
    setLoading(true);
    setError(false);
    
    try {
      const results = await fetchMovies(query);
      
      if (results.length === 0) {
        toast('No movies found for your request.');
        return;
      }
      setMovies(results);
    } catch {
        setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <SearchBar
        onSubmit={handleSearch} />

      {movies.length > 0 &&
        <MovieGrid
          movies={movies}
          onSelect={setSelectedMovie} />
      }

      {loading &&
        <Loader />
      }
      
      {error &&
        <ErrorMessage />
      }
      
      {selectedMovie &&
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)} />
      }
    </>
  );
    
}

