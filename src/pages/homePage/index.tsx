import { useEffect, useState } from 'react';
import '../homePage/style9.css';
import { Header } from '../pgcomponents/Header';
import { Footer } from '../pgcomponents/Footer';
import { useParams } from "react-router-dom";
import axios from 'axios';

interface UserData {
    name: string;
    email: string;
}

export const HomePage = () => {
    const { user } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const getUserData = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/user/${user}`);
                setUserData(response.data)
            } catch (error) {
                console.error('Помилка при запиті до API:', error);
            }
        }

        getUserData()
    }, [user])

    useEffect(() => {
        console.log(userData);
        
    }, [userData])
    
    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user} />

                <main className="home-main">
                    <div className="home-main__container">
                        <div className="home-main-banner">
                            <div className="home-main-banner__container"></div>
                        </div>


                        <div className="home-main-user-info">
                            <div className="home-main-user-info__container">
                                <span className="home-user-info__icon">
                                    <i className="fa-solid fa-user"></i>
                                </span>

                                <div className="home-user-info-info">
                                    <div className="home-user-info-info__container">
                                        <div className="user-info-info__username">{userData !== null ? userData.name : 'no username'}</div>

                                        <div className="user-info-info__email">{userData !== null ? userData.email : 'no email'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="home-user-actions">
                            <div className="home-user-actions__container">

                                <div className="user-actions-saved">
                                    <div className="user-actions-saved__container">
                                        <div className="actions-saved__title">
                                            <i className="fa-solid fa-bookmark"></i>
                                            <div className="actions-saved__title-title">Saved (0)</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-actions-liked">
                                    <div className="user-actions-liked__container">
                                        <div className="actions-liked__title">
                                            <i className="fa-solid fa-heart"></i>
                                            <div className="actions-liked__title-title">Favorite (0)</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-actions-watched">
                                    <div className="user-actions-watched__container">
                                        <div className="actions-watched__title">
                                            <i className="fa-solid fa-check-double"></i>
                                            <div className="actions-watched__title-title">Watched (0)</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>

                {/* <Footer /> */}
            </div>
        </div>
    )
}