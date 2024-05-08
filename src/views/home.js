import { Context } from "../store/context"
import { useContext, useEffect } from "react"





const Home = () => {

    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.getUsers();
        
    }, []);

    return <div className="container">
        {store.userList && store.userList.length > 0 && store.userList.map((user) => user.email)}
    </div>


};

export default Home