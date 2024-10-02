// utils/dbConnect.js
import mongoose from "mongoose";

// Define the MongoDB connection URI from the environment variable
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

// Check if the MONGODB_URI environment variable is defined
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Initialize the cached MongoDB connection
let cached = global.mongo;

// Create a new cached connection object if it doesn't exist
if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

/**
 * Establish a connection to the MongoDB database.
 *
 * @returns {Promise} A promise that resolves to the MongoDB connection.
 */
async function dbConnect() {
  // Check if a connection is already established
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if it doesn't exist
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Connect to the MongoDB database using the provided URI and options
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  // Wait for the connection promise to resolve and store the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
