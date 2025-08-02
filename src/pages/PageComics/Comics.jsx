import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../../components/CardComponent/ComicCard";
import "./Comics.css";

// Déclaration
const Comics = () => {
  // Satets pour stocker la réponse API (liste des comics), chargement, pagination (page actuelle), stock fav
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Active le chargement
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/comics?page=${page}`
        );
        console.log("data reçue :", response.data);
        setData(response.data); // stocke les données
        setIsLoading(false); // Fin du chargement
      } catch (error) {
        console.error("erreur du fetch:", error);
      }
    };

    fetchData(); // Appel
  }, [page]); // changement

  // Gestion des favoris
  const handleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <main>
      <h1>Comics Marvel</h1>

      <section className="articles-container">
        {data.results.map((comics) => (
          <ComicCard
            key={comics._id}
            id={comics._id}
            title={comics.title}
            description={comics.description}
            thumbnail={comics.thumbnail}
            isFavorite={favorites.includes(comics._id)}
            handleFavorite={handleFavorite}
          />
        ))}
      </section>
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          ←
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.results.length < 100}
        >
          →
        </button>
      </div>
    </main>
  );
};

export default Comics;
