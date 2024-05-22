import { Outlet, Navigate } from 'react-router-dom'
import { Context } from "../store/context"
import { useContext } from "react"

const PrivateRoutes = () => {
    const {store}= useContext(Context)
    let accessToken = localStorage.getItem("accessToken")
    let auth = store.val

    if (accessToken === null || accessToken === ""){
         auth = {'token':false}

    }
    else{
         auth = {'token':true}
    }
   
   
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes