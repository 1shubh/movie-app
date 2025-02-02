import React,{useState,useEffect} from "react";
import useFetchData from "../usefetchData";
import { fetchMovieDetails } from "../fetchMovies";
import { useNavigate } from "react-router-dom";
import { MovieSkeletonCard } from "../components/MovieSkeletonCard";
import { MovieCard } from "../components/MovieCard";

export const EditMovie = () => {
  const { data, loading, error } = useFetchData("content");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMoviesData = async () => {
      if (!data || data.length === 0) {
        setMovies([]);
        return;
      }

      const results = await Promise.all(
        data.map(async (movie) => {
          try {
            const details = await fetchMovieDetails(
              movie?.movieId,
              setIsLoading,
              null,
              movie?.type,
              movie?.season,
              movie?.episode
            );

            return details ? { ...movie, tmdbDetails: details } : movie;
          } catch (err) {
            console.error(`Error fetching movie details: ${movie?.movieId}`, err);
            return movie;
          }
        })
      );

      // Sorting Logic
      const sortedMovies = results.sort((a, b) => {
        const dateA = new Date(
          a.tmdbDetails?.episodeDetails?.air_date ||  // Use episode air date if available
          a.tmdbDetails?.release_date || 
          a.tmdbDetails?.air_date || 
          "1970-01-01"
        );
        const dateB = new Date(
          b.tmdbDetails?.episodeDetails?.air_date ||  // Use episode air date if available
          b.tmdbDetails?.release_date || 
          b.tmdbDetails?.air_date || 
          "1970-01-01"
        );
        return dateB - dateA; // Sort descending (latest first)
      });

      setMovies(sortedMovies);
      setIsLoading(false);
    };

    fetchMoviesData();
  }, [data]);


  if (isLoading) return <MovieSkeletonCard />;
  if (error) return <div className="h-[100vh]">Error: {error.message}</div>;

  return (
    <div className="py-5 w-[80%] xl:w-[90%] min-h-[100vh] m-auto">
      {/* <p className="text-xl font-NBold text-white">New Release</p> */}
      <div className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 sm:w-[95%] gap-5">
        {movies.map((movie) => (
          <MovieCard {...movie} />
        ))}
      </div>
    </div>
  );
};
