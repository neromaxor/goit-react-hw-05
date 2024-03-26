import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../fetchApiFilm";

export default function HomePage() {
  const [topMovies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Trending Today</h2>
      {loading && <h4 className={css.loading}>Loading...</h4>}
      <MovieList movies={topMovies} />
      {error && <h4 className={css.error}>Error, please reloading page</h4>}
    </div>
  );
}
