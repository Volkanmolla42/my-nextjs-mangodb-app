import mongoose from "mongoose";

// Define the movie schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the movie (required field)
  plot: String, // Brief description of the movie's plot
  genres: [String], // Array of genres associated with the movie
  runtime: Number, // Runtime of the movie in minutes
  cast: [String], // Array of cast members
  poster: String, // URL for the movie's poster
  fullplot: String, // Detailed description of the plot
  languages: [String], // Array of languages the movie is available in
  released: Date, // Release date of the movie
  directors: [String], // Array of directors
  rated: String, // Rating of the movie (e.g., PG-13)
  year: Number, // Year the movie was released
  imdb: {
    rating: { type: Number, default: 0 }, // IMDB rating, default is 0
    votes: { type: Number, default: 0 }, // Number of votes on IMDB, default is 0
    id: { type: Number, default: 0 }, // IMDB ID for the movie, default is 0
  },
  countries: [String], // Array of countries where the movie was produced
});

// If the Movie model is already defined, use that; otherwise, create a new one
const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

// Export the Movie model
export default Movie;
