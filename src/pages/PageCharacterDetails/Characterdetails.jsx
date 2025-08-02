import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./characterdetails.css";
const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters/${id}`
        );
        setCharacter(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du personnage :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (isLoading) return <p>Chargement...</p>;
  if (!character) return <p>Personnage introuvable.</p>;

  const { name, description, thumbnail, comics } = character;

  return (
    <div className="character-detail-container">
      <h2>{name}</h2>
      <img
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
        className="character-detail-img"
      />
      <p className="character-detail-description">
        {description || "Aucune description disponible pour ce personnage."}
      </p>

      <div className="character-comics-list">
        <h3>Apparaît dans {comics.length} comics :</h3>
        <ul>
          {comics.map((comicId) => (
            <li key={comicId}>Comic ID : {comicId}</li>
            // Tu peux remplacer par un lien plus tard si tu veux
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetail;
