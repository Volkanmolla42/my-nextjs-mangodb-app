"use client";
import { useState } from "react";
import LoadingButton from "@/app/components/Loading"; // Import the LoadingButton component

const MovieForm = () => {
  const [movie, setMovie] = useState({
    title: "", // Movie title
    plot: "", // Plot
    genres: "", // Genres
    runtime: "", // Runtime
    cast: "", // Cast
    poster: "", // Poster URL
    fullplot: "", // Full plot
    languages: "", // Languages
    released: "", // Release date
    directors: "", // Directors
    rated: "", // Rating
    year: "", // Year
    imdb: { rating: 0, votes: 0, id: 0 }, // IMDB information
    countries: "", // Countries
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set IMDB information
    if (name.startsWith("imdb.")) {
      const key = name.split(".")[1];
      setMovie((prev) => ({
        ...prev,
        imdb: { ...prev.imdb, [key]: value },
      }));
    } else {
      // Set other movie information
      setMovie((prev) => ({
        ...prev,
        [name]: [
          "genres",
          "cast",
          "languages",
          "directors",
          "countries",
        ].includes(name)
          ? value.split(",").map((item) => item.trim()) // Split comma-separated values
          : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Start loading state

    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie), // Send movie data in JSON format
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          `Error: ${
            errorData.error || "An error occurred while adding the movie."
          }`
        ); // Show error message
        return;
      }

      alert("Movie successfully added!"); // Show successful addition message
      // Reset form
      setMovie({
        title: "",
        plot: "",
        genres: "",
        runtime: "",
        cast: "",
        poster: "",
        fullplot: "",
        languages: "",
        released: "",
        directors: "",
        rated: "",
        year: "",
        imdb: { rating: 0, votes: 0, id: 0 },
        countries: "",
      });
    } catch (error) {
      console.error("An error occurred while adding the movie:", error); // Log error to console
      alert("An error occurred while adding the movie."); // Show error message
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-slate-400 shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Add Movie</h2>{" "}
      {/* Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="genres"
          placeholder="Genres (comma separated)"
          value={movie.genres}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="runtime"
          placeholder="Runtime (minutes)"
          value={movie.runtime}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast (comma separated)"
          value={movie.cast}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="poster"
          placeholder="Poster URL"
          value={movie.poster}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="languages"
          placeholder="Languages (comma separated)"
          value={movie.languages}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="directors"
          placeholder="Directors (comma separated)"
          value={movie.directors}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="countries"
          placeholder="Countries (comma separated)"
          value={movie.countries}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <textarea
        name="plot"
        placeholder="Plot"
        value={movie.plot}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <textarea
        name="fullplot"
        placeholder="Full Plot"
        value={movie.fullplot}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="number"
        name="year"
        min="1900"
        max="2100"
        placeholder="Year"
        value={movie.year}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="number"
        name="imdb.rating"
        placeholder="IMDB Rating"
        value={movie.imdb.rating}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="number"
        name="imdb.votes"
        placeholder="IMDB Vote Count"
        value={movie.imdb.votes}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="number"
        name="imdb.id"
        placeholder="IMDB ID"
        value={movie.imdb.id}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <LoadingButton loading={loading}>Add Movie</LoadingButton>{" "}
      {/* Add movie button */}
    </form>
  );
};

export default MovieForm;
