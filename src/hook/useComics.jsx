import { useState, useEffect } from "react";
import axios from "axios";

const useComics = (page, searchTerm) => {
  // State pour stocker les comics récupérés depuis l'API
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Effet pour récupérer les comics à chaque changement de page ou de terme de recherche
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Indique que le chargement est en cours
        const response = await axios.get(
          `http://localhost:3000/comics?page=${page}&search=${searchTerm}`
        );
        setData(response.data); // Stocke les comics récupérés
        setIsLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Erreur lors du chargement des comics :", error);
      }
    };

    fetchData();
  }, [page, searchTerm]);

  // Retourne les données et l'état de chargement
  return { data, isLoading };
};

export default useComics;
