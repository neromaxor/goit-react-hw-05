import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviews } from "../../fetchApiFilm";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getDataReviews() {
      try {
        setError(false);
        setLoading(true);
        const data = await getReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getDataReviews();
  }, [movieId]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className={css.container}>
      {loading && <h4>Loading...</h4>}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={css.review}>
            <h5 className={css.author}>Author: {review.author}</h5>
            <p className={css.content}>{review.content}</p>
            <p className={css.dateTime}>{formatDateTime(review.created_at)}</p>
          </div>
        ))
      ) : (
        <h4 className={css.notFound}>Oops... Reviews not yet</h4>
      )}
      {error && <h4 className={css.error}>Error, please reloading page</h4>}
    </div>
  );
}
