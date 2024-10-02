// app/components/RenderMovies.jsx
import React from "react";
import Image from "next/image";

// Asynchronous function to fetch movies from the API
const fetchMovies = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/movies`;
  console.log("API URL:", apiUrl); // Log the API URL

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  // If the response is not ok, get the error message
  if (!response.ok) {
    const errorText = await response.text(); // Get error message
    console.error("Error:", errorText);
    throw new Error("An error occurred while fetching movies.");
  }

  const data = await response.json();
  console.log("API Response:", data); // Log the response
  return data;
};

// RenderMovies component
const RenderMovies = async () => {
  let movies;
  try {
    movies = await fetchMovies(); // Fetch movies
  } catch (error) {
    console.error("Error:", error);
    return <div>An error occurred while fetching movies: {error.message}</div>; // Show error message
  }

  // If there are no movies, show a message
  if (!movies || movies.length === 0) {
    return <div>No movies found.</div>; // If no movies, show message
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={movie.poster}
              alt={movie.title}
              width={400}
              height={600}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-gray-600">{movie.plot}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">
                  Genres: {movie.genres.join(", ")}
                </span>
                <span className="text-sm font-medium text-gray-700 ml-4">
                  Runtime: {movie.runtime} minutes
                </span>
                <span className="text-sm font-medium text-gray-700 ml-4">
                  IMDB Rating: {movie.imdb.rating}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Director(s): {movie.directors.join(", ")}
              </p>
              <p className="text-gray-500 text-sm">
                Release Date: {new Date(movie.released).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderMovies;
