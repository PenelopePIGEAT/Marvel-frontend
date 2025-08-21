import { useState, useEffect } from "react";
import axios from "axios";

const useCharacters = (page, searchTerm) => {
  // State pour stocker les personnages
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les personnages depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/characters?page=${page}&search=${searchTerm}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur chargement des personnages :", error);
      }
    };

    fetchData();
  }, [page, searchTerm]);

  return { data, isLoading };
};

export default useCharacters;
