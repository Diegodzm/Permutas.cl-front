import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let accessToken = localStorage.getItem("accessToken")
    let auth = {'token':false}
   

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