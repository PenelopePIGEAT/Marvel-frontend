import { useParams } from "react-router-dom";
import Slider from "react-slick";
import useCharacterComics from "../../hook/useCharactercomics";
import "./CharacterInComics.css";

const CharacterInComics = () => {
  // Récupération de l'ID du personnage depuis l'URL
  const { characterId } = useParams();

  // Hook pour récupérer les comics du personnage
  const { comics, isLoading } = useCharacterComics(characterId);

  // Loader si les comics sont en cours de récupération
  if (isLoading) return <p>Chargement des comics du personnage...</p>;

  // Affichage principal
  const sliderSettings = {
    dots: true, // points de navigation
    infinite: false, // pas de boucle infinie
    speed: 500, // vitesse du slider en ms
    slidesToShow: 3, // nombre de comics visibles
    slidesToScroll: 1, // nombre de slides défilés à chaque mouvement
  };

  return (
    <div className="character-comics-container">
      <h2>Comics du personnage</h2>

      {comics.length === 0 ? (
        <p>Ce personnage n'apparaît dans aucun comic.</p>
      ) : (
        <Slider {...sliderSettings}>
          {comics.map((comic) => (
            <div key={comic._id} className="comic-slide">
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
  );
};

export default CharacterInComics;
