import { Context } from "../store/context";
import { useContext, useEffect } from "react";
import { Button, Container, Carousel } from "react-bootstrap";
import 'animate.css/animate.min.css';
import { useNavigate } from "react-router-dom";
import "./home.css";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";

const Home = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.accessTokenExpired();
        actions.getNotifications();
        console.log(store.user_id);
        console.log(store.validation);
        console.log(store.usernotifications.length);
    }, []);

    const handleButtonClick = () => {
        navigate('/products');
    };

    return (
        <div className="body">
            <Container>
            
                <h1 className="animate__animated animate__fadeInDown mt-3">
                    Permuta tus productos y únete a la comunidad de Permutadores de Chile
                </h1>
                <Carousel className="mb-4 mt-5">
                    <Carousel.Item>
                        <img className="d-block w-100" src={image1} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={image2} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={image3} alt="Third slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={image4} alt="Fourth slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={image5} alt="Fifth slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={image6} alt="Sixth slide" />
                    </Carousel.Item>
                </Carousel>

                <h2 className="animate__animated animate__fadeInUp mt-5">
                    Descubre una nueva forma de obtener lo que necesitas
                </h2>
                <Button
                    variant="primary"
                    className="animate__animated animate__pulse animate__infinite home-btn"  
                    onClick={handleButtonClick}
                >
                    Productos Disponibles
                </Button>

                <div className="user-list mt-3">
                    {store.userList && store.userList.length > 0 && store.userList.map((user) => (
                        <p key={user.email} className="animate__animated animate__fadeIn">{user.email}</p>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;
