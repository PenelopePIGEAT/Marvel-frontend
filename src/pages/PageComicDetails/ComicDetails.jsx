import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ComicDetails.css";

const ComicDetail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comic/${id}`);
        setComic(response.data);
      } catch (err) {
        setError("Erreur lors du chargement du comic.");
        console.error(err);
      }
    };

    fetchComic();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!comic) return <p>Chargement...</p>;

  return (
    <div className="comic-detail-container">
      <h1 className="comic-title">{comic.title}</h1>
      <div className="comic-detail-content">
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="comic-img"
        />
        <div className="comic-info">
          <p className="comic-description">{comic.description || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;
