import '../genrePage/style10.css';
import { Header } from "../pgcomponents/Header";
import { Genre } from './components/Genre';

export const GenrePage = () => {
    const user = '647382392'
    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user}/>

                <main className="genre-main">
                    <div className="genre-main__container">
                        <div className="genre-main-title">
                            <div className="genre-main-title__container">
                                <span></span>

                                <div className="genre-main-title__title">Anime-action</div>
                            </div>
                        </div>

                        <div className="genre-main-content">
                            <div className="genre-main-content__container">
                                <div className="genre-anime-list">
                                    <div className="genre-anime-list__container">
                                        <Genre />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}