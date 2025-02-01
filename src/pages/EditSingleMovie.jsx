import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchData from "../usefetchData";

export const EditSingleMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); // For navigation after update or delete
  const { data, loading, error } = useFetchData(`content/${movieId}`);

  // Local state to store the updated title and videoUrl
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state for update and delete

  useEffect(() => {
    // Set the initial values based on fetched data
    if (data) {
      setTitle(data.title);
      setVideoUrl(data.videoUrl);
    }
  }, [data]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "videoUrl") {
      setVideoUrl(value);
    }
  };
  // Handle update click
  const handleUpdate = async () => {
    setIsLoading(true); // Set loading state to true when updating
    const updatedContent = { title, videoUrl };
    try {
      const response = await fetch(
        `https://movie-app-backend-n712.onrender.com/api/content/edit/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );
      const result = await response.json();

      if (response.ok) {
        alert("Movie updated successfully!");
        navigate(`/edit-movie`); // Redirect to the movie details page
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Failed to update movie.");
    } finally {
      setIsLoading(false); // Reset loading state after operation
    }
  };

  // Handle delete click
  const handleDelete = async () => {
    setIsLoading(true); // Set loading state to true when deleting
    try {
      const response = await fetch(
        `https://movie-app-backend-n712.onrender.com/api/content/delete/${data._id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (response.ok) {
        alert("Movie deleted successfully!");
        navigate("/edit-movie"); // Redirect to the movies list page after deletion
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete movie.");
    } finally {
      setIsLoading(false); // Reset loading state after operation
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <p className="text-white font-bold text-center text-2xl">
        Please wait...
      </p>
    );
  }
  if (error)
    return <p className="text-white font-bold text-center text-2xl">{error}</p>;

  return (
    <div className="min-h-[100vh]">
      <p className="text-center font-NRegular text-white text-2xl">
        Update <span className="font-NBold">{data.title}</span>
      </p>
      <div className="w-[50%] m-auto mt-5 bg-white p-5 rounded-xl">
        <p className="font-NRegular mt-4">Edit Movie Title</p>
        <input
          placeholder="Movie Title"
          className="border w-full p-2 rounded-xl"
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          required
        />

        <p className="font-NRegular mt-4">Edit Video URL</p>
        <input
          placeholder="Video URL"
          className="border w-full p-2 rounded-xl"
          type="url"
          name="videoUrl"
          value={videoUrl}
          onChange={handleInputChange}
          required
        />
        <div className="flex items-center justify-between mt-5">
          <button
            className="bg-secondary px-5 py-2 rounded-xl"
            onClick={handleDelete}
            disabled={isLoading} // Disable the delete button while loading
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="bg-secondary px-5 py-2 rounded-xl"
            onClick={handleUpdate}
            disabled={isLoading} // Disable the update button while loading
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};
