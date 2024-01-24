import '../aboutPage/style5.css'
import { Header } from '../pgcomponents/Header';
import { Footer } from '../pgcomponents/Footer';
import { useParams } from "react-router-dom";

export const AboutPage = () => {
    const { user } = useParams();

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user}/>

                <main className="about-main">
                    <div className="about-main__container">
                        <div className="about-main-background__container"></div>

                        <div className="about-main-title">
                            <div className="about-main-title__container">
                                About us
                            </div>
                        </div>

                        <div className="about-main-content">
                            <div className="about-main-content__container">
                                <div className="about-main-text">
                                    <div className="about-main-text__container">
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Natus placeat neque blanditiis sint consectetur eveniet eligendi.
                                            Ad sed magni sapiente consequatur, recusandae facere, ipsam alias quibusdam,
                                            nesciunt ullam magnam assumenda.

                                        </p>

                                        <p>
                                            Ad sed magni sapiente consequatur, recusandae facere, ipsam alias quibusdam,
                                            nesciunt ullam magnam assumenda.
                                        </p>
                                    </div>
                                </div>

                                <div className="support-section">
                                    <div className="support-section__container">
                                        <div className="support-section__title">
                                            support us here:
                                        </div>

                                        <div className="support-section__nav">
                                            <a href="https://github.com/harukadoo">
                                                <i className="fa-brands fa-github"></i>
                                            </a>

                                            <a href="https://t.me/Studio_Kachur">
                                                <i className="fa-brands fa-telegram"></i>
                                            </a>
                                        </div>
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