import { Link } from "react-router-dom";

interface TopAnimeProps {
    id: number;
    title: string;
    score: number;
    image: string;
    userId: string | undefined;
}

export const TopAnime = ({ id, title, score, image, userId }: TopAnimeProps) => {
    return (
        <div className="top-anime__anime">
            <Link to={`/anime/${userId}/${id}`} className="top-anime__image">
                <img src={image} alt="banner" />

                <div className="top-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>{score}</span>
                </div>
            </Link>

            <div className="top-anime__name">{title}</div>
        </div>
    )
}