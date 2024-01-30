import { Link } from "react-router-dom";


const genreButtons = ['action', 'drama', 'fantasy', 'psychological',
  'thriller', 'romance', 'adventure', 'comedy',
  'school', 'sports', 'music', 'supernatural', 'suspense'];

export const GenreButton = ({ userId }: any) => {
  return (
    <div className="genres-options__buttons">
      {genreButtons.map((button: string, index: number) => (
        <Link to={`/genre/${userId}/${button}`} key={index} className="options__btn">{button}</Link>
      ))}
    </div>

  )
}