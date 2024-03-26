import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { searchByQuery } from "../../fetchApiFilm";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const query = params.get("query") ?? "";

  const changeQuery = (newQuery) => {
    params.set("query", newQuery);
    setParams(params);
  };

  useEffect(() => {
    async function getMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await searchByQuery(query);
        setMovies(data.results);
        if (data.results.length === 0) {
          setErrorNotFound(true);
        } else {
          setErrorNotFound(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [query]);

  return (
    <div className={css.container}>
      {loading && <h4 className={css.loading}>Loading...</h4>}
      <form>
        <input
          type="text"
          name="search"
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          className={css.searchInput}
        />
      </form>
      {errorNotFound && (
        <h4 className={css.notFound}>Sorry, results not found</h4>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <h4 className={css.error}>Error, please reload the page</h4>}
    </div>
  );
}
