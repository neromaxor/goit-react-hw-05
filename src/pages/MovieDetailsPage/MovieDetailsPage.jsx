import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoById } from "../../fetchApiFilm";

export default function MovieDetailsPage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        setLoading(true);
        const info = await getInfoById(movieId);
        setMovieInfo(info);
      } catch (error) {
        console.error("Error fetching movie info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieInfo();
  }, [movieId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{movieInfo.title}</h2>
          <p>{movieInfo.overview}</p>
          {/* Додайте інші дані про фільм */}
        </>
      )}
    </div>
  );
}
