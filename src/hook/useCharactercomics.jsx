import { useState, useEffect } from "react";
import axios from "axios";

// Hook pour récupérer tous les comics d'un personnage
const useCharacterComics = (characterId) => {
  // State pour stocker les comics
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effet déclenché à chaque changement de characterId
  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);

        // Récupération des infos du personnage
        const response = await axios.get(
          `http://localhost:3000/characters/${characterId}`
        );
        const characterData = response.data;

        // Récupération des comics un par un
        const comicsArray = [];
        for (const comicId of characterData.comics) {
          const comicResponse = await axios.get(
            `http://localhost:3000/comic/${comicId}`
          );
          comicsArray.push(comicResponse.data);
        }

        // Stockage des comics dans le state
        setComics(comicsArray);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des comics du personnage :",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchComics();
  }, [characterId]);

  // Retourne la liste des comics et l'état de chargement
  return { comics, isLoading };
};

export default useCharacterComics;
