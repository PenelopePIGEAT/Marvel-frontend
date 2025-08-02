import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./CharacterInComics.css";

import "./CharacterInComics.css";

const CharacterInComics = () => {
  // Récupération de l'ID du personnage dans l'URL via React Router
  const { characterId } = useParams();
  // States pour stocker les données du personnage et des comics
  const [comics, setComics] = useState([]);
  const [characterThumbnail, setCharacterThumbnail] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // lancerla requête API au chargement ou lorsque l'ID change
  useEffect(() => {
    const fetchComics = async () => {
      try {
        // Requête GET vers le backend pour récupérer les comics d'un personnage
        const response = await axios.get(
          `http://localhost:3000/comics/${characterId}`
        );
        // Mise à jour des états avec les données reçues
        setComics(response.data.comics);
        setCharacterThumbnail(response.data.thumbnail);
        setCharacterName(response.data.name);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setIsLoading(false);
      }
    };

    fetchComics(); // Appel de la fonction dès que le render
  }, [characterId]); // déclenche si l'ID change

  if (isLoading) return <p>Chargement...</p>;

  // Configuration du slider (carousel) avec des options de responsive design
  const settings = {
    dots: true, // Affiche les petits points sous le slider
    infinite: true, // Boucle infinie
    speed: 500, // Vitesse d'animation
    slidesToShow: 1, // Nombre de slides visibles
    slidesToScroll: 1, // Combien de slides à faire défiler à la fois
  };

  return (
    <div className="characterincomics-page">
      <h1 className="characterincomics-name">
        Comicsgraphie de {characterName}
      </h1>

      {characterThumbnail && (
        <div
          className="characterincomics-background"
          style={{
            backgroundImage: `url(${characterThumbnail.path}.${characterThumbnail.extension})`,
          }}
        />
      )}

      <div className="characterincomics-slider">
        {comics.length > 0 ? (
          <Slider {...settings}>
            {comics.map((comic) => (
              <div key={comic._id} className="characterincomics-slideimg">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <div className="characterincomics-slidedescription">
                  <h3>{comic.title}</h3>
                  <p>{comic.description || ""}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>Aucun comic trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterInComics;
