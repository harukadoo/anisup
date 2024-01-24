import '../genrePage/style10.css';
import { Header } from "../pgcomponents/Header";
import { Footer } from '../pgcomponents/Footer';
import { Genre } from './components/Genre';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

export const GenrePage = () => {
    const { genre, user } = useParams();
    const [genreList, setGenreList] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getGenreList = async () => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${currentPage}`);
            const filteredData = response.data.data
            .map((anime: any) => ({
                id: anime.mal_id,

                genres: anime.genres.map((genre: any) => {
                    return genre.name
                }).filter((name: any) =>  name.toLowerCase().includes(genre)),

                title: anime.title_english || anime.title,
                score: anime.score,
                image: anime.images.jpg.large_image_url,
              }))
              .filter((data: any) => data.genres.length > 0)

              setGenreList((prevList) => [...prevList, ...filteredData]);

        } catch (error) { 
            console.error('Помилка при запиті до API:', error);
        }
    }

    useEffect(() => {
        getGenreList()
    }, [currentPage])

    useEffect(() => {
        console.log(genreList);
        
    }, [genreList])

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user}/>

                <main className="genre-main">
                    <div className="genre-main__container">
                        <div className="genre-main-title">
                            <div className="genre-main-title__container">
                                <span></span>

                                <div className="genre-main-title__title">Anime-{genre}</div>
                            </div>
                        </div>

                        <div className="genre-main-content">
                            <div className="genre-main-content__container">
                                <div className="genre-anime-list">
                                    <div className="genre-anime-list__container">
                                        {genreList.map((anime: any, index: number) => (
                                            <Genre 
                                            key={index}
                                            id={anime.id}
                                            title={anime.title}
                                            score={anime.score}
                                            image={anime.image}
                                            userId={user}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button className="genre-main__btn" onClick={() => setCurrentPage(prev => prev += 1)}>Show more...</button>
                            </div>
                        </div>

                        
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}