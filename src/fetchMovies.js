import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchMovieDetails = async (movieId, setLoading, setMovie) => {
  try {
    setLoading && setLoading(true); // Start loading
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    setLoading && setLoading(false); // Stop loading
    setMovie && setMovie(response.data);
    return response.data;
  } catch (error) {
    setLoading && setLoading(false); // Ensure loading stops on error
    if (error.response && error.response.status === 404) {
      console.log(`Movie with ID ${movieId} not found on TMDB.`);
      return null;
    }
    console.error(`Error fetching movie with ID ${movieId}:`, error.message);
    return null;
  }
};
