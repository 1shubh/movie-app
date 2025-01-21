import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../usefetchData";
import { fetchMovieDetails } from "../fetchMovies";
import CircularProgress from "../components/CircularProgress";
import { Button } from "@chakra-ui/react";

export const Watch = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error } = useFetchData(`content/${params?.movieId}`);
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60); // Get the whole hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  };

  console.log(data);

  useEffect(() => {
    fetchMovieDetails(
      data?.movieId,
      setIsLoading,
      setMovie,
      data?.type,
      data?.season
    );
  }, [data]);

  console.log(movie);

  const percentage = ((movie.vote_average / 10) * 100).toFixed(2);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading video</p>;

  return (
    <div className={`mt-5`}>
      <div className={`w-[80%] m-auto rounded-xl min-h-[500px] relative`}>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl opacity-1"
        />
        <div className="w-full h-full absolute top-0 right-0 rounded-xl flex items-center gap-10 p-10">
          <div className="w-[40%] rounded-xl">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              alt="poster"
              className="w-full rounded-xl"
            />
          </div>
          <div className="text-white">
            <p className="text-2xl font-NBold">{movie.title}</p>
            {/* details */}
            <div className="flex font-NRegular gap-5">
              <p>{movie.release_date || movie.air_date}</p>
              <div className="flex items-center gap-2">
                {movie?.genres?.map((ele, i) => {
                  return <p key={i}>{ele.name}</p>;
                })}
              </div>
              <p>{convertMinutesToTime(movie.runtime)}</p>
            </div>
            {/* progress */}
            <div className="mt-5 flex items-center gap-5">
              <div className="">
                <CircularProgress percentage={Math.round(percentage)} />
                <p className="font-NBold mt-1">User Score</p>
              </div>
              <a href={data?.videoUrl} target="_blank">
                <Button
                  variant={"solid"}
                  className="bg-primary w-[150px] h-[40px] rounded-3xl text-black font-NBold"
                >
                  Watch Now
                </Button>
              </a>
            </div>
            <p className="font-NRegular mt-2">{movie.tagline}</p>
            <p className="font-NBold text-xl mt-2">Overview</p>
            <p className="font-NRegular">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
