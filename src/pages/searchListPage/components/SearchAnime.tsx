import { Link } from "react-router-dom";

export const SearchAnime = () => {
    const id = 1234;
    return (
        <div className="search-anime__anime">
            <Link to={`/anime/${id}`} className="search-anime__image">
                <div className="search-anime__img"></div>

                <div className="search-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>1.0</span>
                </div>

            </Link>

            <div className="search-anime__name">Name</div>
        </div>
    )
}