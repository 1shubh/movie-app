import axios from "axios";


export const fetchMovieDetails = async (
  movieId,
  setLoading,
  setMovie,
  type,
  season,
  episode
) => {
  try {
    setLoading && setLoading(true); // Start loading

    let episodeData = null;
    let seasonData = null;

    if (type === 1) {
      // Fetch Movie Details
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        { params: { api_key: process.env.REACT_APP_TMDB_API_KEY } }
      );

      setMovie && setMovie(movieResponse.data);
      setLoading && setLoading(false);
      return movieResponse.data;
    } else if (type === 2) {
      // Fetch Season Data
      const seasonResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieId}/season/${season}`,
        { params: { api_key: process.env.REACT_APP_TMDB_API_KEY } }
      );

      seasonData = seasonResponse.data;

      if (episode !== undefined) {
        // Fetch Episode Data
        const episodeResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}/season/${season}/episode/${episode}`,
          { params: { api_key: process.env.REACT_APP_TMDB_API_KEY } }
        );

        episodeData = episodeResponse.data;
      }

      // Combine Episode and Season Data
      const finalData = {
        ...seasonData,
        episodeDetails: episodeData || null, // Include episode data if available
      };

      setMovie && setMovie(finalData);
      setLoading && setLoading(false);
      return finalData;
    }
  } catch (error) {
    setLoading && setLoading(false); // Stop loading on error
    console.error(`Error fetching content with ID ${movieId}:`, error.message);
    return null;
  }
};
