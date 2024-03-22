import { useState } from "react";
import { searchByQuery } from "../../fetchApiFilm";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState(params.get("query") || "");

  const handleSearch = async () => {
    const inputValue = searchQuery.trim();
    if (!inputValue) {
      alert("Please enter your query");
      return;
    }

    try {
      setError(false);
      setLoading(true);
      const data = await searchByQuery(inputValue);
      setMovies(data.results);
      setErrorNotFound(data.results.length === 0);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSearch();
    setParams({ query: searchQuery });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          className={css.searchInput}
          placeholder="Enter search query"
        />
        <button type="submit">Search</button>
      </form>
      {errorNotFound && (
        <h4 className={css.notFound}>Sorry, results not found</h4>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
