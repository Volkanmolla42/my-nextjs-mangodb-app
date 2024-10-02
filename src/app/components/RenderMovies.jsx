"use client"; // Bu satırı ekle
import React, { useEffect, useState } from "react";
import Image from "next/image";

const RenderMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null); // WebSocket durumu

  // Veritabanından filmleri çeken fonksiyon
  const fetchMovies = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/movies`, {
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // WebSocket bağlantısını oluştur
    const newSocket = new WebSocket("ws://localhost:8080"); // Sunucu adresi
    setSocket(newSocket); // Socket'i state'e kaydet

    newSocket.onopen = () => {
      console.log("WebSocket bağlantısı açıldı.");
    };

    newSocket.onmessage = (event) => {
      console.log("Sunucudan gelen mesaj:", event.data);
      fetchMovies(); // Yeni veriler geldiğinde filmi tekrar çek
    };

    newSocket.onclose = () => {
      console.log("WebSocket bağlantısı kapatıldı.");
    };

    // Sayfa ilk açıldığında filmleri getir
    fetchMovies();

    // Her 5 saniyede bir verileri güncelle
    const interval = setInterval(fetchMovies, 5000);

    // Bileşen unmount olduğunda bağlantıyı kapat ve interval'i temizle
    return () => {
      newSocket.close(); // WebSocket bağlantısını kapat
      clearInterval(interval);
    };
  }, []);

  // Eğer hata varsa hata mesajını göster
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Eğer film yoksa kullanıcıya bildirim göster
  if (!movies || movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:shadow-2xl flex flex-col"
          >
            <Image
              src={movie.poster}
              alt={`Poster of ${movie.title}`}
              width={300}
              height={450}
              className="w-full h-auto object-cover rounded-t-lg"
              priority
            />

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-2xl font-semibold mb-3">{movie.title}</h3>
              <p className="text-gray-500">{movie.plot}</p>
              <div className="mt-2 flex flex-wrap">
                <span className="text-sm font-medium text-gray-700">
                  Genres: {movie.genres.join(", ")}
                </span>
                <span className="text-sm font-medium text-gray-700 ml-4">
                  Runtime: {movie.runtime} min
                </span>
                <span className="text-sm font-medium text-gray-700 ml-4">
                  IMDB:{" "}
                  <span className="text-yellow-500">{movie.imdb.rating}</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Director(s): {movie.directors.join(", ")}
              </p>
              <p className="text-gray-500 text-sm">
                Release Date: {new Date(movie.released).getFullYear()}
              </p>
              <button className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200">
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderMovies;
