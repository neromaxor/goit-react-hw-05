import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  const buildNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/" className={buildNavLinkClass}>
          HomePage
        </NavLink>
        <NavLink to="/movies" className={buildNavLinkClass}>
          MoviesPage
        </NavLink>
      </nav>
    </div>
  );
}
