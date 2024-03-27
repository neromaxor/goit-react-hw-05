import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { searchByQuery } from "../../fetchApiFilm";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [params] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const [searchValue, setSearchValue] = useState(params.get("query") || "");

  useEffect(() => {
    setSearchValue(params.get("query") || "");
  }, [params]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const inputValue = searchValue.trim();
    if (inputValue === "") {
      return alert("Please enter your query");
    }

    try {
      setErrorNotFound(false);
      setError(false);
      setLoading(true);
      const data = await searchByQuery(inputValue);
      setMovies(data.results);
      if (data.results.length === 0) {
        setErrorNotFound(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      {loading && <h4 className={css.loading}>Loading...</h4>}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      {errorNotFound && (
        <h4 className={css.notFound}>Sorry, results not found</h4>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <h4 className={css.error}>Error, please reload the page</h4>}
    </div>
  );
}
