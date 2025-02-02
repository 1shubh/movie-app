import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../usefetchData";
import { fetchMovieDetails } from "../fetchMovies";
import CircularProgress from "../components/CircularProgress";
import { Button } from "@chakra-ui/react";
import { fetchSeriesDetails } from "../lib/fetchWebseries";
import { WatchLoading } from "../components/WatchLoading";
import { FaPlayCircle } from "react-icons/fa";
import { Helmet } from "react-helmet"; // Import Helmet

export const Watch = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [webseries, setWebseries] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { data, loading, error } = useFetchData(`content/${params?.movieId}`);

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60); // Get the whole hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  };

  // console.log(isLoading);
  // console.log(data);

  useEffect(() => {
    fetchMovieDetails(
      data?.movieId,
      setIsLoading,
      setMovie,
      data?.type,
      data?.season
    );
    if (data.type === 2) {
      fetchSeriesDetails(data?.movieId, setIsLoading, setWebseries);
    }
  }, [data]);

  // console.log(movie);

  const percentage = ((movie.vote_average / 10) * 100).toFixed(2);
  const webseriespercentage = ((webseries.vote_average / 10) * 100).toFixed(2);

  if (isLoading || loading)
    return (
      <div className="w-[80%] h-[100vh] m-auto mt-5">
        <WatchLoading />
      </div>
    );
  if (error) return <p>Error loading video</p>;
  return (
    <div className={`mt-5 lg:mt-2 min-h-[100vh] watchpage`}>
      <Helmet>
        <title>{`${data.title} - Watch Online full movie`}</title>
        <meta
          name="description"
          content={
            movie.overview ||
            webseries.overview ||
            "Watch this movie full or series full online."
          }
        />
        <meta
          name="keywords"
          content={`${movie.title}, ${movie.genres
            ?.map((genre) => genre.name)
            .join(", ")}, movie, watch`}
        />
        <meta property="og:title" content={movie.title || webseries.name} />
        <meta
          property="og:description"
          content={movie.overview || webseries.overview}
        />
        <meta
          property="og:image"
          content={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${
            movie.poster_path || webseries.poster_path
          }`}
        />
        <meta
          property="og:url"
          content={`https://yourdomain.com/watch/${params.movieId}`}
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div
        className={`w-[80%] lg:w-[90%] m-auto rounded-xl min-h-[500px] xs:h-fit lg:h-fit relative`}
      >
        {movie.backdrop_path || webseries.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w1280/${
              movie.backdrop_path || webseries.backdrop_path
            }`}
            alt=""
            className="w-full h-full object-cover rounded-xl opacity-1 lg:hidden blur-[2px] brightness-50"
          />
        ) : (
          <></>
        )}
        <p className="text-center font-NBold text-xl absolute lg:relative top-0 left-0 right-0 bottom-0 m-auto mt-5 text-white">
          Download or Watch {data.title}{" "}
          {data.season && `Season ${data.season}`} full  720p HD
        </p>
        <div className="w-full h-full absolute top-0 right-0 rounded-xl lg:relative flex lg:grid items-center gap-10 p-10 xs:p-2 ">
          {movie.backdrop_path || webseries.backdrop_path ? (
            <div className="w-[30%] lg:w-[30%] sm:w-[40%] xs:w-[65%] lg:mt-0 lg:m-auto rounded-xl overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt="poster"
                className="w-full h-full object-cover rounded-xl drop-shadow-xl"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="text-white">
            <p className="text-2xl font-NBold">
              {movie.title || webseries.name}{" "}
              {data.season && `Season ${data.season}`}
            </p>
            {/* details */}
            <div className="flex flex-wrap font-NRegular gap-5">
              <p>{movie.release_date || movie.air_date}</p>
              <div className="flex items-center flex-wrap gap-2">
                {data.type === 2
                  ? webseries?.genres?.map((ele, i) => {
                      return <p key={i}>{ele.name}</p>;
                    })
                  : movie?.genres?.map((ele, i) => {
                      return <p key={i}>{ele.name}</p>;
                    })}
              </div>
              {movie.runtime && <p>{convertMinutesToTime(movie.runtime)}</p>}
            </div>
            {/* progress */}
            {movie.title || webseries.name ? (
              <div className="mt-5 flex items-center gap-5">
                <div className="">
                  <CircularProgress
                    percentage={Math.round(
                      data.type === 1 ? percentage : webseriespercentage
                    )}
                  />
                  <p className="font-NBold mt-1">User Score</p>
                </div>
                <a href={data?.videoUrl} target="_blank">
                  <Button
                    variant={"solid"}
                    className="bg-[#ffbc00] w-[150px] h-[40px] rounded-3xl text-black font-NBold"
                  >
                    <FaPlayCircle />
                    Play Now
                  </Button>
                </a>
              </div>
            ) : (
              <></>
            )}
            <p className="font-NRegular mt-2">{movie.tagline}</p>
            {movie.tagline && (
              <p className="font-NBold text-xl mt-2">Overview</p>
            )}
            <p className="font-NRegular">{data.type === 1 ? movie.overview : webseries.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
