import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=ad6a8c18&i=${id}&plot=full`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
          setError('');
        } else {
          setError(data.Error);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch movie details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="details-container">Loading movie details...</p>;
  if (error) return <p className="details-container" style={{ color: "red" }}>{error}</p>;

  return (
    <div className="details-container">
      <Link to="/">⬅ Back to search</Link>
      <h2>{movie.Title} ({movie.Year})</h2>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
        alt={movie.Title}
      />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
    </div>
  );
}

export default MovieDetails;
