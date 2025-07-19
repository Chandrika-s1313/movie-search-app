import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=ad6a8c18&i=${id}&plot=full`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error status : ${response.status}`)
                }
                return response.json();
            })
            .then((data) => {
                if (data.Response === "True") {
                    setMovies(data);
                    setErrors("");
                } else {
                    setErrors(data.Error);
                }
                setLoading(false);
            })
            .catch((err) => {
                setErrors("Failed to fetch movie details");
                setLoading(false);
            });
    }, [id])

    if (loading) return <p>Loading movie details .....</p>;
    if (errors) return <p style={{ color: "red" }}>{errors}</p>;

    return (
        <div>
            <Link to="/">Back to search</Link>
            <h2>{movies.Title} ({movies.Year})</h2>
            <img src={movies.Poster !== "N/A" ? movies.Poster : "https://via.placeholder.com/200"} alt={movies.Title} width="28%" style={{ display: "block", margin: "20px auto" }}/>
            <p><strong>Genre :</strong>{movies.Genre}</p>
            <p><strong>Actors:</strong> {movies.Actors}</p>
            <p><strong>Plot:</strong> {movies.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movies.imdbRating}</p>
            <p><strong>Runtime:</strong> {movies.Runtime}</p>

        </div>
    )
}
export default MovieDetails;