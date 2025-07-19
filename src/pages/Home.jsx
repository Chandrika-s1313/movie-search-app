import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
                if (!response.ok) {
                    throw new Error(`HTTP error status :${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.Response === "True") {
                    setMovies(data.Search);   // "Search is there in API and it comes when it gets succeed , it's not there in React or javascript"
                    setErrors('');
                } else {
                    setMovies([]);   
                    setErrors(data.Error); // Error is also there in API only
                }
                setLoading(false);
            })
            .catch((err) => {
                setErrors(err.message);
                setLoading(false);
            });
    }

    return (

        <div>
            {loading && <p>Loading .....</p>}
            <h2>Search Movies</h2>
            <input
                type="text"
                placeholder="Enter the movie title"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={searchMovies}>Search</button>
            {errors && <p style={{ color: "red" }}>{errors}</p>}
            <br/>
            <br/>
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID} >
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} width="40%"/>
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