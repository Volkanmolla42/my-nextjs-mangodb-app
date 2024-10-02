import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Movie from "@/models/Movie"; // Ensure the model is imported correctly

const uri = process.env.MONGODB_URI; // Get the MongoDB URI from environment variables

// Connect to the database
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
    console.log("MongoDB connection established."); // Log connection success
  }
}

// GET method
export async function GET() {
  await connectToDatabase();

  try {
    const movies = await Movie.find({}); // Retrieve all movies
    return NextResponse.json(movies, { status: 200 }); // Return movies as JSON with 200 status
  } catch (error) {
    console.error("An error occurred while retrieving movies:", error); // Log the error
    return NextResponse.json(
      { error: "An error occurred while retrieving movies" }, // Return error message
      { status: 500 } // Return 500 status
    );
  }
}

// POST method
export async function POST(request) {
  await connectToDatabase();

  try {
    const movieData = await request.json(); // Get the incoming data
    const movie = new Movie(movieData); // Create a new Movie instance
    const result = await movie.save(); // Save the data to the database

    return NextResponse.json(
      { message: "Movie added successfully!", result }, // Return success message and result
      { status: 201 } // Return 201 status
    );
  } catch (error) {
    console.error("An error occurred while adding the movie:", error); // Log the error
    return NextResponse.json(
      { error: "An error occurred while adding the movie" }, // Return error message
      { status: 500 } // Return 500 status
    );
  }
}
