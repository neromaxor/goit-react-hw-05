import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <p>OPPSS Not Found Page try again...</p>
      <Link to="/">Back to Home Page</Link>
    </div>
  );
}
