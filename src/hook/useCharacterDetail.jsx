import { useState, useEffect } from "react";
import axios from "axios";

// Hook pour récupérer les détails d'un personnage et ses comics associés
const useCharacterDetail = (characterId) => {
  // State pour stocker les infos du personnage
  const [character, setCharacter] = useState(null);
  const [isLoadingCharacter, setIsLoadingCharacter] = useState(true);

  // State pour stocker les comics du personnage
  const [comicsData, setComicsData] = useState([]);
  const [isLoadingComics, setIsLoadingComics] = useState(true);

  // Effet déclenché à chaque changement de characterId
  useEffect(() => {
    const fetchCharacterAndComics = async () => {
      try {
        // Récupération des infos du personnage
        const response = await axios.get(
          `http://localhost:3000/characters/${characterId}`
        );
        const characterData = response.data;
        setCharacter(characterData);
        setIsLoadingCharacter(false);

        // Récupération des comics associés au personnage
        const comicsArray = [];
        for (const comicId of characterData.comics) {
          const comicResponse = await axios.get(
            `http://localhost:3000/comic/${comicId}`
          );
          comicsArray.push(comicResponse.data);
        }
        setComicsData(comicsArray);
      } catch (error) {
        console.error(
          "Erreur lors du chargement du personnage et des comics :",
          error
        );
      } finally {
        setIsLoadingCharacter(false);
        setIsLoadingComics(false);
      }
    };

    // Appel de la fonction pour lancer le fetch
    fetchCharacterAndComics();
  }, [characterId]);

  // Retourne les données et l'état de chargement
  return { character, comicsData, isLoadingCharacter, isLoadingComics };
};

export default useCharacterDetail;
