import { Context } from "../store/context";
import { useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import 'animate.css/animate.min.css';
import "./home.css";

const Home = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.accessTokenExpired();
        actions.getNotifications();
        console.log(store.user_id);
        console.log(store.validation);
        console.log(store.usernotifications.length);
    }, []);

    return (
        <div className="body">
            <Container>
                <h1 className="animate__animated animate__fadeInDown">
                    Permuta tus productos y únete a la comunidad de Permutadores de Chile
                </h1>
                <Button 
                    variant="primary" 
                    className="animate__animated animate__pulse animate__infinite"
                >
                    Productos Disponibles
                </Button>
                <h2 className="animate__animated animate__fadeInUp mt-4">
                    Descubre una nueva forma de obtener lo que necesitas
                </h2>
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
