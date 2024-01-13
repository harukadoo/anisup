import { Link } from "react-router-dom";

interface PopularProps{
    id: number;
    title: string;
    score: number;
    image: string;
    userId: string | undefined;
}

export const Popular = ({ id, title, score, image, userId }: PopularProps) => {
    return (
        <div className="popular-anime__anime">
            <Link to={`/anime/${userId}/${id}`} className="popular-anime__img">
                <div className="popular-anime__gradient"></div>
                <img src={image} alt="banner" />

                <div className="popular-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>{score}</span>
                </div>

                <div className="popular-anime__name">{title}</div>

            </Link>
        </div>
    )
}