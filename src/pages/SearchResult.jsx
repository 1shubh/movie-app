import React, { useEffect, useState } from "react";
import useFetchData from "../usefetchData";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../fetchMovies";
import { MovieSkeletonCard } from "../components/MovieSkeletonCard";
import { MovieCard } from "../components/MovieCard";

export const SearchResult = () => {
  const { query } = useParams(); // Get search query from route params
  const {
    data: moviesData,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchData("content"); // Fetch all movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Filtered movies based on query
  const [detailedMovies, setDetailedMovies] = useState([]); // Movies with detailed data
  const [isLoading, setIsLoading] = useState(true);

  // Filter movies based on query
  useEffect(() => {
    if (query.trim() !== "" && moviesData?.length > 0) {
      const filtered = moviesData.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]); // If query is empty or no movies match
    }
  }, [query, moviesData]); // Trigger filtering when query or moviesData changes

  // Fetch detailed movie data for filtered movies
  useEffect(() => {
    const fetchMoviesData = async () => {
      if (!filteredMovies || filteredMovies.length === 0) {
        setDetailedMovies([]); // No movies to process
        setIsLoading(false); // Stop loading if no filtered movies
        return;
      }

      try {
        const results = await Promise.all(
          filteredMovies.map(async (movie) => {
            try {
              const details = await fetchMovieDetails(
                movie?.movieId,
                setIsLoading,
                (movieDetails) => {
                  // Optionally process movie details here
                },
                movie?.type, // Pass movie type
                movie?.season
              );
              return details ? { ...movie, tmdbDetails: details } : movie;
            } catch (err) {
              console.error(
                `Error fetching movie details for: ${movie?.movieId}`,
                err
              );
              return movie; // Return movie without additional details on error
            }
          })
        );
        // Sort movies by release date (latest first)
        const sortedMovies = results.sort((a, b) => {
          const dateA = new Date(
            a.tmdbDetails?.release_date ||
              a.tmdbDetails?.air_date ||
              "1970-01-01"
          );
          const dateB = new Date(
            b.tmdbDetails?.release_date ||
              b.tmdbDetails?.air_date ||
              "1970-01-01"
          );
          return dateB - dateA; // Descending order
        });
        setDetailedMovies(sortedMovies);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesData();
  }, [filteredMovies]); // Only run this when filteredMovies changes

  if (isLoading) return <MovieSkeletonCard />;
  if (moviesError)
    return <div className="h-[100vh]">Error: {moviesError.message}</div>;

  return (
    <div className="py-5 w-[80%] xl:w-[90%] min-h-[100vh] m-auto">
      <h1 className="text-xl text-white font-semibold mb-5">
        Search Results for: <span className="text-secondary">{query}</span>
      </h1>
      <div className="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 sm:w-[95%] gap-5">
        {detailedMovies.length > 0 ? (
          detailedMovies.map((movie) => (
            <MovieCard {...movie} key={movie.movieId} />
          ))
        ) : (
          <div className="text-white">No results found for "{query}"</div>
        )}
      </div>
    </div>
  );
};
