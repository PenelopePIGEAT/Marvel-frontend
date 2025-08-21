import { useParams } from "react-router-dom";
import Slider from "react-slick";
import useCharacterDetail from "../../hook/useCharacterDetail.jsx";
import "./characterdetails.css";

const CharacterDetail = () => {
  // Récupération de l'ID du personnage depuis l'URL
  const { id } = useParams();

  // Hook pour récupérer le personnage et ses comics
  const { character, comicsData, isLoadingCharacter, isLoadingComics } =
    useCharacterDetail(id);

  // Loader si les infos du personnage sont en cours de récupération
  if (isLoadingCharacter) return <p>Chargement du personnage...</p>;

  // Si aucun personnage trouvé
  if (!character) return <p>Personnage introuvable.</p>;

  // Destructuration pour simplifier l'accès aux infos
  const { name, description, thumbnail } = character;

  // Configuration du slider pour les comics
  const sliderSettings = {
    dots: true, // points de navigation
    infinite: false, // pas de boucle infinie
    speed: 500, // vitesse de défilement en ms
    slidesToShow: 3, // nombre de comics visibles
    slidesToScroll: 1, // nombre de slides défilés à chaque mouvement
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
        {isLoadingComics ? (
          <p>Chargement des comics...</p>
        ) : (
          <Slider {...sliderSettings}>
            {comicsData.map((comic) => (
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
    </div>
  );
};

export default CharacterDetail;
