import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieDashboard.css";

function MovieDashboard() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const searchMovies = () => {
    if (!input.trim()) {
      setErrors("Please enter a movie title");
      return;
    }
    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=ad6a8c18&s=${input}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setErrors('');
        } else {
          setMovies([]);
          setErrors(data.Error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrors(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="dashboard-container">
      <h2>🎬 Search Movies</h2>
      <input
        type="text"
        placeholder="Enter movie title"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>

      {loading && <p>Loading...</p>}
      {errors && <p className="error">{errors}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                alt={movie.Title}
              />
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDashboard;
