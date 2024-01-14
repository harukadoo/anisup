import '../homePage/style9.css';
import { Header } from '../pgcomponents/Header';
import { useParams } from "react-router-dom";

export const HomePage = () => {
    const { user } = useParams<string>();
    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user}/>
            </div>
        </div>
    )
}