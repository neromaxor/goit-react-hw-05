import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li className={css.listItem} key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={css.movieLink}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
