import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const MovieCard = ({ movieId, tmdbDetails, title, _id }) => {
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const handleRoute = (movieId) => {
    if (location.pathname === "/") {
      navigate(`/watch/${movieId}`);
    } else if (location.pathname === "/edit-movie") {
      navigate(`/edit-movie/${movieId}`);
    } else {
      navigate(`/watch/${movieId}`);
    }
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
              ? `https://image.tmdb.org/t/p/original/${tmdbDetails?.poster_path}`
              : "./images/not-found.jpg"
          }
          alt={title || "Movie Poster"}
          className="w-full rounded-t-xl"
          loading="lazy"
        />
      </div>
      <p className="text-white font-NRegular text-center mt-4 px-2">{title}</p>
    </div>
  );
};
