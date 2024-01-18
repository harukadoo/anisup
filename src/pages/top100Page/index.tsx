import '../top100Page/style7.css';
import { Header } from '../pgcomponents/Header';
import { Footer } from '../pgcomponents/Footer';
import { useParams } from "react-router-dom";
import { TopAnime } from './components/TopAnime';
import { useState, useEffect } from "react";
import axios from "axios";

export const TopAnimePage = () => {
    const { user } = useParams<string>();

    const [topAnime, setTopAnime] = useState<any[]>([]);

    const getTopAnime = async () => {
        try{
            const response = await axios.get('https://api.jikan.moe/v4/top/anime?page=1');
            setTopAnime(response.data.data);
        } catch (error) {
            console.error('Помилка при запиті до API:', error);
        }
    }

    useEffect(() => {
        getTopAnime()
    },[]);

    useEffect(() => {
        console.log(topAnime);
        
    }, [topAnime])

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user}/>

                <main className="top-anime-main">
                    <div className="top-anime-main__container">
                        <div className="top-anime-main-title">
                            <div className="top-anime-main-title__container">
                                <span></span>

                                <div className="top-anime-main-title__title">Top 100 anime</div>
                            </div>
                        </div>


                        <div className="top-anime-main-content">
                            <div className="top-anime-main-content__container">
                                <div className="top-anime-top">
                                    <div className="top-anime-top__container">
                                        {topAnime.map((anime: any, index: number) => (
                                            <TopAnime 
                                            key={index}
                                            id={anime.mal_id}
                                            title={anime.title_english}
                                            score={anime.score}
                                            image={anime.images.jpg.large_image_url}
                                            userId={user}
                                            />
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}