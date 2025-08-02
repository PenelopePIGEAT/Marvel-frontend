import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./CharacterInComics.css";

import "./CharacterInComics.css";

const CharacterInComics = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [characterThumbnail, setCharacterThumbnail] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/${characterId}`
        );
        setComics(response.data.comics);
        setCharacterThumbnail(response.data.thumbnail);
        setCharacterName(response.data.name);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setIsLoading(false);
      }
    };

    fetchComics();
  }, [characterId]);

  if (isLoading) return <p>Chargement...</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
