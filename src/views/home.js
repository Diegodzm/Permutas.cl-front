import { Context } from "../store/context"
import { useContext, useEffect } from "react"

const Home = () => {

    const { actions,store  } = useContext(Context)
    useEffect(() => {
        actions.accessTokenExpired();
        console.log(store.validation)
        
     
    }, []);
    return <div className="container">
        <div style={{ marginTop: '50px'} }></div>
            <h1 className="text-center" style={{ color: 'black', fontSize: '64px' }}>Permuta tus productos y únete a la comunidad de Permutadores de Chile</h1>
            <button className="btn btn-primary" style={{ backgroundColor: '#426B1F', color: 'white', display: 'block', margin: '30px auto' }}>productos Disponibles</button>
            <div style={{ marginBottom: '50px' }}></div>
            <h2 className="text-center" style={{ color: 'black', fontSize: '32px' }}>Descubre una nueva forma de obtener lo que necesitas</h2>
           
            <div className="container"></div>
        {store.userList && store.userList.length > 0 && store.userList.map((user) => user.email)}
    </div>


};

export default Home