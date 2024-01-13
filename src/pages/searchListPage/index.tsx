import { Header } from "../pgcomponents/Header";
import { Footer } from "../pgcomponents/Footer";
import '../searchListPage/style8.css';
import { SearchAnime } from "./components/SearchAnime";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

export const SearchList = () => {
    const { search } = useParams<string>();
    const [searchValue, setSearchValue] = useState<any>([]);
    const [formattedSearch, setFormattedSearch] = useState<string | undefined>(undefined);

    useEffect(() => {
      setFormattedSearch(search?.replace('%20', ' '));
      console.log(formattedSearch)
    }, [search]);

    useEffect(() => {
        const getSearchValue = async () => {
          try {
            if (formattedSearch) {
              const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${formattedSearch}`);
              setSearchValue(response.data.data);
            }

          } catch (error) {
            console.log(error);
          }
        };
    
        getSearchValue();
      }, [formattedSearch]);


    useEffect(() => {
        console.log(searchValue);

    }, [searchValue])
    return (
        <div className="container">
            <div className="inner__container">
                <Header />

                <div className="search-main">
                    <div className="search-main__container">
                        <div className="search-anime-list">
                            <div className="search-anime-list__container">

                                <SearchAnime />
                                <SearchAnime />
                                <SearchAnime />
                                <SearchAnime />
                                <SearchAnime />
                                <SearchAnime />

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