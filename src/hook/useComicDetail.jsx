import { useState, useEffect } from "react";
import axios from "axios";

// Hook pour récupérer les détails d'un comic
const useComicDetail = (comicId) => {
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/comic/${comicId}`
        );
        setComic(response.data);
      } catch (err) {
        setError("Erreur lors du chargement du comic.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComic();
  }, [comicId]);

  return { comic, isLoading, error };
};

export default useComicDetail;
