import { Header } from "../pgcomponents/Header"
import { Footer } from "../pgcomponents/Footer"
import '../animePage/style6.css'

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const AnimePage = () => {
    const [animeData, setAnimeData] = useState<any[]>([]);
    const { user, id } = useParams();

    const getAnimeData = async () => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);

            const anime = response.data.data;

            const filteredData = {
                title: anime.title_english || anime.title,
                jptitle: anime.title_japanese,
                year: anime.year,
                genres: anime.genres.map((genre: any) => {
                    return genre.name
                }),
                rating: anime.rating,
                episodes: anime.episodes,
                duration: anime.duration,
                status: anime.status,
                score: anime.score,
                favorites: anime.favorites,
                scored_by: anime.scored_by,
                image: anime.images.jpg.large_image_url,
                about: anime.synopsis,
                trailer: anime.trailer.url,
                trailerBanner: anime.trailer.images.maximum_image_url || anime.trailer.images.large_image_url,
            }
            setAnimeData([filteredData]);

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        getAnimeData();
    }, []);

    useEffect(() => {
        console.log(animeData);

    }, [animeData])



    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [saves, setSaves] = useState<number>(0);

    useEffect(() => {
        if (animeData.length > 0) {
            setSaves(animeData[0].scored_by);
        }
    }, [animeData]);

    const toggleBookmark = () => {
        setIsBookmarked(prevState => !prevState);
        if (isBookmarked) {
            setSaves(prevSaves => prevSaves - 1);
        } else {
            setSaves(prevSaves => prevSaves + 1);
        }
    };


    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
        if (animeData.length > 0) {
            setLikes(animeData[0].favorites);
        }
    }, [animeData]);

    const toggleLikes = () => {
        setIsLiked(prevState => !prevState);
        if (isLiked) {
            setLikes(prevLikes => prevLikes - 1);
        } else {
            setLikes(prevLikes => prevLikes + 1);
        }
    };

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user}/>

                <main className="anime-main">
                    <div className="anime-main__container">
                        <div className="anime-main__content">
                            <div className="anime-info">
                                <div className="anime-info__container">
                                    <div className="anime-info__image">
                                        <img src={animeData.length > 0 ? animeData[0].image : ''} alt="banner" />
                                    </div>

                                    <div className="anime-info__description">
                                        <div>
                                            <p className="anime-info__name">{animeData.length > 0 ? animeData[0].title : ''}</p>

                                            <p className="anime-info__jpname">{animeData.length > 0 ? animeData[0].jptitle : ''}</p>
                                        </div>

                                        <div className="anime-info__full-info">
                                            <p className="anime-info__release">
                                                Release: <span>{animeData.length > 0 ? animeData[0].year : ''}</span>
                                            </p>

                                            <p className="anime-info__genres">
                                                Genres: 
                                                <span>{animeData.length > 0 
                                                ? animeData[0].genres.map((genre: string) => genre.toLowerCase()).join(', ') 
                                                : ''}</span>
                                            </p>

                                            <p className="anime-info__rating">
                                                Rating: <span>{animeData.length > 0 ? animeData[0].rating : ''}</span>
                                            </p>

                                            <p className="anime-info__episodes">
                                                Episodes: <span>{animeData.length > 0 ? animeData[0].episodes : ''}</span>
                                            </p>

                                            <p className="anime-info__duration">
                                                Duration: <span>{animeData.length > 0 ? animeData[0].duration : ''}</span>
                                            </p>

                                            <p className="anime-info__status">
                                                Status: <span>{animeData.length > 0 ? animeData[0].status : ''}</span>
                                            </p>
                                        </div>

                                        <div className="anime-info__nav">
                                            <p className="anime-info__rank">
                                                <i className="fa-solid fa-star"></i>
                                                <span>{animeData.length > 0 ? animeData[0].score : ''}</span>
                                            </p>

                                            <div className="anime-info__like-btn">
                                                <button onClick={toggleLikes}>
                                                    <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                                                </button>
                                                <span>{animeData.length > 0 ? likes : ''}</span>
                                            </div>

                                            <div className="anime-info__save-btn">
                                                <button onClick={toggleBookmark}>
                                                    <i className={isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
                                                </button>
                                                <span>{animeData.length > 0 ? saves : ''}</span>
                                            </div>

                                            {/* <div className="anime-info__unlike-btn">
                                                <button>
                                                    <i className="fa-solid fa-heart-crack"></i>
                                                </button>
                                                <span>-</span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="anime-main-about">
                                <div className="anime-main-about__container">
                                    <div className="anime-main-about__title">About the title:</div>

                                    <div className="anime-main-about__description">
                                        {animeData.length > 0 ? animeData[0].about : ''}

                                    </div>
                                </div>
                            </div>

                            <div className="anime-main-trailer">
                                <div className="anime-main-trailer__container">


                                    <a className="anime-main-trailer__trailer" href={animeData.length > 0 ? animeData[0].trailer : ''}>
                                        <img src={animeData.length > 0 ? animeData[0].trailerBanner : ''} alt="treiler-preview-img" />
                                    </a>

                                </div>
                            </div>

                            <div className="anime-main-dub">
                                <div className="anime-main-dub__container">
                                    <span>You can watch all episodes here — </span>
                                    <a href="https://t.me/Studio_Kachur" className="dub__link">https://t.me/Studio_Kachur</a>
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