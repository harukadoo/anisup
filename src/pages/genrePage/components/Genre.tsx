import { Link } from "react-router-dom";

export const Genre = () => {
    return (
        <div className="genre-anime__anime">
            <Link to={'/'} className="genre-anime__image">
                <div></div>

                <div className="genre-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>1.0</span>
                </div>
            </Link>

            <div className="genre-anime__name">Name</div>
        </div>
    )
}