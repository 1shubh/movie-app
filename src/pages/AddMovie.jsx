import React, { useState } from "react";
import useFetchData from "../usefetchData";

export const AddMovie = () => {
  const { data: categories, loading, error } = useFetchData("categories");
  const [formData, setFormData] = useState({
    movieId: "",
    categoryId: "",
    videoUrl: "",
    title: "",
    type: "",
    season: "",
    episode: "", // Added episode number
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ["categoryId", "type", "movieId", "season", "episode"].includes(
        name
      )
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://movie-app-backend-n712.onrender.com/api/content",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Movie or Series added successfully!");
        setFormData({
          movieId: "",
          categoryId: "",
          videoUrl: "",
          title: "",
          type: "",
          season: "",
          episode: "",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Failed to add the movie or series."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <p className="text-center text-2xl font-NBold text-white">
        Please Wait.....
      </p>
    );
  if (error)
    return (
      <p className="text-center text-2xl font-NBold text-white">{error}</p>
    );

  return (
    <div className="min-h-[100vh] py-10">
      <p className="text-center font-NRegular text-white text-2xl">
        Add new movie or webseries
      </p>
      <form
        className="w-[50%] m-auto mt-5 bg-white p-5 rounded-xl"
        onSubmit={handleSubmit}
      >
        <p className="font-NRegular">TMDB Movie ID</p>
        <input
          placeholder="TMDB movie ID"
          className="border w-full p-2 rounded-xl"
          type="number"
          name="movieId"
          value={formData.movieId}
          onChange={handleInputChange}
          required
        />
        <p className="font-NRegular mt-4">Choose Category ID</p>
        <select
          className="border w-full p-2 rounded-xl"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
        </select>
        <p className="font-NRegular mt-4">Video URL</p>
        <input
          placeholder="Video URL"
          className="border w-full p-2 rounded-xl"
          type="url"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleInputChange}
          required
        />
        <p className="font-NRegular mt-4">Movie Title</p>
        <input
          placeholder="Movie Title"
          className="border w-full p-2 rounded-xl"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <p className="font-NRegular mt-4">Content Type</p>
        <select
          className="border w-full p-2 rounded-xl"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select type
          </option>
          <option value={1}>Movie</option>
          <option value={2}>TV Series</option>
        </select>
        {formData.type === 2 && (
          <div>
            <p className="font-NRegular mt-4">Season</p>
            <input
              placeholder="TV Series Season"
              className="border w-full p-2 rounded-xl"
              type="number"
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              required={formData.type === 2}
            />
          </div>
        )}
        {formData.categoryId === 5 && formData.type === 2 && (
          <div>
            <p className="font-NRegular mt-4">Episode Number</p>
            <input
              placeholder="Episode Number"
              className="border w-full p-2 rounded-xl"
              type="number"
              name="episode"
              value={formData.episode}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {successMessage && (
          <p className="mt-4 text-green-500 font-NRegular">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-500 font-NRegular">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-5 m-auto px-5 py-2 rounded-xl ${
            isSubmitting ? "bg-gray-400" : "bg-secondary"
          } text-black font-NRegular`}
        >
          {isSubmitting ? "Please Wait...." : "Add Movie or Series"}
        </button>
      </form>
    </div>
  );
};
