import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AnimeProps {
    key: number;
    id: number;
    title: string;
    jptitle: string;
    year: number;
    status: string;
    score: number;
    image: string;
    userId: string | undefined;
}

export const Anime = ({ id, title, jptitle, year, status, score, image, userId }: AnimeProps) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    const toggleBookmark = () => {
        setIsBookmarked(prevState => !prevState);
    };

    const displayedScore = score !== null ? score : "not rated";
    const displayedRelease = year !== null ? year : "unknown"

    return (
        <div className="anime__container">
            <Link to={`/anime/${userId}/${id}`} className="anime__image">
                <img src={image} alt="banner" />
            </Link>

            <div className="anime__info">
                <div>
                    <p className="anime__name">{title}</p>
                    <p className="anime__jpname">{jptitle}</p>
                </div>

                <div>
                    <p className="anime__release">Release: {displayedRelease}</p>
                    <p className="anime__status">Status: <span>{status}</span></p>
                    <p className="anime__rating">
                        <i className="fa-solid fa-star"></i>
                        {displayedScore}
                    </p>
                </div>

                <button className="anime__save-btn" onClick={toggleBookmark}>
                    <i className={isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
                </button>
            </div>
        </div>
    )
}