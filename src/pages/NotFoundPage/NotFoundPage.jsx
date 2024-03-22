import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p>OPPSS Not Found Page try again...</p>
      <Link to="/" className={css.link}>
        Back to Home Page
      </Link>
    </div>
  );
}
