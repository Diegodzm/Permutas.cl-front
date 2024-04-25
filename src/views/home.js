import { Context } from "../store/context"
import { useContext,useEffect } from "react"





const Home =()=>{

    const {actions,store}= useContext(Context)
    useEffect(()=>{
        actions.getUsers();
    },[]);

    return <div className="container">{
        store.usersList && store.usersList.length>0 && store.usersList.map((user)=><h1>{user.email}</h1>)
}</div>


};

export default Home