import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ComicDetails.css";

const ComicDetail = () => {
  // Récupération de l'ID du comic depuis l'URL
  const { id } = useParams();
  // States pour stocker les données du comic et les éventuelles erreurs
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(null);

  // useEffect déclenché au render
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

    fetchComic(); //appel fonction
  }, [id]); //condition de relance

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
