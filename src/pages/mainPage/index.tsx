import { Anime } from "./components/Anime"
import '../mainPage/style3.css'
import { Footer } from '../pgcomponents/Footer';
import { Header } from '../pgcomponents/Header';
import { Recommended } from "./components/Recommended";
import { Popular } from "./components/Popular";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


interface ResponseData {
  mal_id: number;
  title_english: string;
  title_japanese: string;
  year: number;
  status: string;
  score: number | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  };

}

interface AnimeData {
  index: number;
  id: number;
  title: string;
  jptitle: string;
  year: number;
  status: string;
  score: number;
  image: string;
  userId: string | undefined;
}

const recommendedAnime = [
  { id: 52991, title: 'Frieren: Beyond Journey\' s End', image: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg" },
  { id: 51009, title: 'Jujutsu Kaisen Season 2', image: "https://cdn.myanimelist.net/images/anime/1792/138022l.jpg" },
  { id: 34618, title: 'Blend S', image: "https://cdn.myanimelist.net/images/anime/6/88286l.jpg" },

]

export const MainPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [newAnimeData, setNewAnimeData] = useState<AnimeData[]>([]);
  const [popularAnimeData, setPopularAnimeData] = useState<any>([]);
  const { user } = useParams();

  const getNewAnime = async () => {

    try {
      const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/winter');
      const filteredData = response.data.data
        .filter((anime: ResponseData) => anime.score !== null)
        .map((anime: ResponseData) => ({
          id: anime.mal_id,
          title: anime.title_english,
          jptitle: anime.title_japanese,
          year: anime.year,
          status: anime.status,
          score: anime.score,
          image: anime.images.jpg.large_image_url,
        }));
      setNewAnimeData(filteredData);
    } catch (error) {
      console.error('Помилка при запиті до API:', error);
    }
  };


  const getPopularAnime = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime?type=tv');
      const filteredData = response.data.data
        .filter((anime: any) => anime.trailer.url !== null)
        .map((anime: any) => ({
          id: anime.mal_id,
          title: anime.title_english,
          score: anime.score,
          image: anime.images.jpg.large_image_url,
        }));
      setPopularAnimeData(filteredData);

    } catch (error) {
      console.error('Помилка при запиті до API:', error);
    }
  }

  useEffect(() => {
    getNewAnime();
    getPopularAnime();
  }, []);

  useEffect(() => {
    console.log(popularAnimeData);

  }, [popularAnimeData])

  return (
    <div className="container">
      <div className="inner__container">
        <Header userId={user} inputValue={inputValue}/>

        <main className="main">
          <div className="main__container">
            <div className="main-background__container"></div>



            <div className="main-content">
              <div className="main-content__container">

                <div className="main-title">
                  <div className="main-title__container">
                    Hello, Traveler!
                  </div>
                </div>

                <div className="main-search">
                  <div className="main-search__container">
                    <input
                      type="text"
                      className="main-search__input"
                      placeholder='search anime'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                    <button type="submit" className="main-search__btn">
                      <Link to={`/search-list/${inputValue}`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    </button>
                  </div>
                </div>


                <div className="main-content__popular-anime">
                  <div className="popular-anime__container">
                    <div className="popular-anime__anime-titles">
                      {popularAnimeData.slice(0, 6).map((anime: any, index: number) => (
                        <Popular
                          key={index}
                          id={anime.id}
                          title={anime.title}
                          score={anime.score}
                          image={anime.image}
                          userId={user}
                        />
                      ))}

                    </div>

                    <Link to={'/top100'} className="popular-anime__link">see more</Link>

                  </div>
                </div>


                <div className="main-content__main-content">
                  <div className="content-left">
                    <div className="content-left__container">
                      <div className="newest-anime">
                        <div className="newest-anime__container">
                          <div className="newest-anime__title">
                            Newest anime releases:
                          </div>

                          <div className="newest-anime__anime">
                            {newAnimeData.slice(0, 5).map((animeItem: AnimeData, index: number) => (
                              <Anime
                                key={index}
                                id={animeItem.id}
                                title={animeItem.title}
                                jptitle={animeItem.jptitle}
                                year={animeItem.year}
                                status={animeItem.status}
                                score={animeItem.score}
                                image={animeItem.image}
                                userId={user}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="content-right">
                    <div className="genres">
                      <div className="genres__container">
                        <div className="genres__title">Genres</div>

                        <span></span>

                        <div className="genres-options">
                          <div className="genres-options__container">
                            <button className="options__btn">action</button>
                            <button className="options__btn">drama</button>
                            <button className="options__btn">fantasy</button>
                            <button className="options__btn">psychological</button>
                            <button className="options__btn">thriller</button>
                            <button className="options__btn">romance</button>
                            <button className="options__btn">adventure</button>
                            <button className="options__btn">comedy</button>
                            <button className="options__btn">school</button>
                            <button className="options__btn">sports</button>
                            <button className="options__btn">shounen</button>
                            <button className="options__btn">music</button>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="recommended">
                      <div className="recommended__container">
                        <div className="recommended__title">
                          Our recommendations:
                        </div>

                        <div className="recommendations">
                          <div className="recommendations__container">
                            {recommendedAnime.map((anime: any, index: number) => (
                              <Recommended
                                key={index}
                                id={anime.id}
                                title={anime.title}
                                image={anime.image}
                                userId={user}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>


                <div className="main-content__about">
                  <p className="main-content__about-title">Watch anime films and series</p>

                  <p className="main-content__about-description">
                    Japan gave the world such a unique cultural phenomenon as anime. These are not just animated films or series for children, because some subgenres of anime will be more interesting for adults.
                    This greatly expands the scope of animated works, allowing anime studios to shoot science fiction, detective, fantasy, thrillers.

                    <br />
                    <br />

                    Moreover, the orientation of anime to a more mature audience results in high-quality scenarios and plots full of philosophy, psychology or ideological concepts.
                    <br />
                    The Anisup project offers to get acquainted with the unique phenomenon of anime on our website.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}