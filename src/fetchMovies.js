import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchMovieDetails = async (movieId, setLoading, setMovie, type,season) => {
  try {
    setLoading && setLoading(true); // Start loading

    let url = "";
    if (type === 1) {
      // Movie API endpoint
      url = `https://api.themoviedb.org/3/movie/${movieId}`;
    } else if (type === 2) {
      // TV show season endpoint
      url = `https://api.themoviedb.org/3/tv/${movieId}/season/${season}`; // Season 2 hardcoded for now, adjust as needed
    }

    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });

    setLoading && setLoading(false); // Stop loading
    setMovie && setMovie(response.data);
    return response.data;
  } catch (error) {
    setLoading && setLoading(false); // Ensure loading stops on error
    if (error.response && error.response.status === 404) {
      console.log(`Content with ID ${movieId} not found on TMDB.`);
      return null;
    }
    console.error(`Error fetching content with ID ${movieId}:`, error.message);
    return null;
  }
};
