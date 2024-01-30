import { Header } from "../pgcomponents/Header";
import { Footer } from "../pgcomponents/Footer";
import '../searchListPage/style8.css';
import { SearchAnime } from "./components/SearchAnime";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

export const SearchList = () => {
  const { titles, user } = useParams();
  const [searchValue, setSearchValue] = useState<any>([]);

  useEffect(() => {
    if (titles !== undefined) {
      const decodedSearch = decodeURIComponent(titles);

      const getSearchValue = async () => {
        try {
          const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${decodedSearch}`);
          setSearchValue(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      getSearchValue();
    }
  }, [titles]);

  return (
    <div className="search-list-container">
      <div className="search-list-inner__container">
        <Header userId={user} />

        <div className="search-main">
          <div className="search-main__container">
            <div className="search-anime-list">
              <div className="search-anime-list__container">

                {searchValue.map((anime: any, index: number) => (
                  <SearchAnime
                    key={index}
                    id={anime.mal_id}
                    title={anime.title_english || anime.title}
                    score={anime.score}
                    image={anime.images.jpg.large_image_url}
                    userId={user}

                  />
                )).sort((a: any, b: any) => b.props.score - a.props.score)}

              </div>
            </div>

            <div className="search-main__caption">this is all we have</div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}