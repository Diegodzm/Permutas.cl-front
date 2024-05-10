import { Context } from "../store/context"
import { useContext, useEffect } from "react"

const Home = () => {

    const { actions,store  } = useContext(Context)
    useEffect(() => {
        actions.accessTokenExpired();
        
     
    }, []);
    if(store.loginValidation){
        actions.accessTokenExpired()
        .then(window.location.reload())
    }
    

    return <div className="container">
     


      
    </div>


};

export default Home