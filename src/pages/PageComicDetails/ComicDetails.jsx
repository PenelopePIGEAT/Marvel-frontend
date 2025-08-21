import { useParams } from "react-router-dom";
import useComicDetail from "../../hook/useComicDetail.jsx";
import "./ComicDetails.css";

const ComicDetail = () => {
  const { id } = useParams();
  const { comic, isLoading, error } = useComicDetail(id);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!comic) return <p>Comic introuvable.</p>;

  return (
    <div className="comic-detail-container">
      <h1 className="comic-title">{comic.title}</h1>
      <div className="comic-detail-content">
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="comic-img"
        />
        <div className="comic-info">
          <p className="comic-description">{comic.description || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;
