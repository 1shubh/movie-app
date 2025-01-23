import React from "react";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movieId, tmdbDetails, title }) => {
  const navigate = useNavigate();
  const handleRoute = (movieId) => {
    navigate(`/watch/${movieId}`);
  };
  return (
    <div
      key={movieId}
      onClick={() => handleRoute(movieId)}
      className="cursor-pointer bg-black rounded-xl"
    >
      <div className="m-auto">
        <img
          src={
            tmdbDetails?.poster_path
              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tmdbDetails?.poster_path}`
              : "./images/not-found.jpg"
          }
          alt={title || "Movie Poster"}
          className="w-full rounded-t-xl"
        />
      </div>
      <p className="text-white font-NRegular text-center mt-4 px-2">{title}</p>
    </div>
  );
};
