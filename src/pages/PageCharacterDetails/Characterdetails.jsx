import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick"; //pour carroussel
import "./characterdetails.css";

const CharacterDetail = () => {
  // Récupère l'id du personnage depuis l'URL
  const { id } = useParams();

  // States : personnage, chargement personnage, liste des comics, chargement comics
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comicsData, setComicsData] = useState([]);
  const [isComicsLoading, setIsComicsLoading] = useState(true);

  // useEffect déclenché à chaque changement d'id pour récupérer données perso + comics
  useEffect(() => {
    const fetchCharacterAndComics = async () => {
      try {
        // Requête pour récupérer les infos du personnage via son id
        const response = await axios.get(
          `http://localhost:3000/characters/${id}`
        );
        // Stockage des données personnage
        const characterData = response.data;
        setCharacter(characterData);

        // Récupération des comics un par un grâce aux IDs dans characterData.comics
        const comicsArray = [];
        for (const comicId of characterData.comics) {
          const comicResponse = await axios.get(
            `http://localhost:3000/comic/${comicId}`
          );
          // Ajout de chaque comic dans un tableau
          comicsArray.push(comicResponse.data);
        }
        // Stockage de la liste complète de comics
        setComicsData(comicsArray);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        // Allélouia chargements (personnage + comics)
        setIsLoading(false);
        setIsComicsLoading(false);
      }
    };
    // Appel de la fonction async pour lancer les requêtes
    fetchCharacterAndComics();
  }, [id]); //relance si l'id change (nouveau personnage)

  // Affichage conditionnel : si perso en chargement, message attente
  if (isLoading) return <p>Chargement du personnage...</p>;
  // Si aucun perso après chargement, message erreur
  if (!character) return <p>Personnage introuvable.</p>;

  // Destructuration des infos du personnage pour simplifier l'accès lol
  const { name, description, thumbnail } = character;

  // Configuration du slider (carrousel) pour afficher les comics
  const sliderSettings = {
    dots: true, // Affiche les points de navigation
    infinite: false, // Pas de boucle infinie
    speed: 500, // Vitesse de défilement en ms
    slidesToShow: 3, // Nombre de comics visibles à la fois
    slidesToScroll: 1, // Nombre de slides défilés à chaque mouvement
  };
  return (
    <div className="characterdetail-container">
      <h2 className="characterdetail-name">{name}</h2>
      <div className="characterdetail-wrapper">
        <div className="characterdetail-imgetdesc">
          <img
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt={name}
            className="characterdetail-img"
          />
          <p className="characterdetail-description">{description || ""}</p>
        </div>
      </div>

      <div className="character-comics-list">
        <h3>Apparaît dans {comicsData.length} comics :</h3>
        {isComicsLoading ? (
          <p>Chargement des comics...</p>
        ) : (
          <Slider {...sliderSettings}>
            {comicsData.map((comic) => (
              <div key={comic.id} className="comic-slide">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <p>{comic.title}</p>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
