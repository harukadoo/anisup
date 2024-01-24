import { Link } from "react-router-dom";

interface GenreProps {
    id: number;
    title: string;
    score: number;
    image: string;
    userId: string | undefined;
}

export const Genre = ({ id, title, score, image, userId }: GenreProps) => {
    return (
        <div className="genre-anime__anime">
            <Link to={`/anime/${userId}/${id}`} className="genre-anime__image">
                <img src={image} alt="banner" />

                <div className="genre-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>{score}</span>
                </div>
            </Link>

            <div className="genre-anime__name">{title}</div>
        </div>
    )
}