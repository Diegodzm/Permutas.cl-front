export const getState = ({ getActions, getStore, setStore }) => {
    return {
        store: {
            user:{
                username: "",
                firstname:"",
                lastname:"",
                password: "",
                email: ""
                
            },

            usersList:[]
        },
        actions: {
            handleOnchange: (event)=>{
                const store= getStore()
                setStore({
                    user:{
                        ...store.user,
                        [event.target.name]: event.target.value
                        
                    }
                })
                
                
                console.log(store.user)
            },
           
            handleSubmitGoogleuser:(user)=>{
                fetch("http://localhost:5000/user/logingoogle",{ 
                method :"POST",
                body: JSON.stringify(user),
                headers:{
                    "content-type":"application/json"
                }
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .then((error)=>console.log(error))

            },
          
            handleSubmituser: (event)=>{
                const store= getStore()
                event.preventDefault()
                fetch("http://localhost:5000/user/register",{ 
                method :"POST",
                body: JSON.stringify(store.user),
                headers:{
                    "content-type":"application/json"
                }
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .then((error)=>console.log(error))
            },

            handleSubmitLogin: (event)=>{
                const store= getStore()
                event.preventDefault()
                fetch("http://localhost:5000/user/login",{ 
                method :"POST",
                body: JSON.stringify(store.user),
                headers:{
                    "content-type":"application/json"
                }
            })
            .then((response)=>response.json())
            .then((data)=>{console.log(data);
                setStore({
                accessToken: data.access_token,
            })})
            .then((error)=>console.log(error))
            },

            getUsers: ()=>{
                const store =getStore()
                if (store.accessToken ){
                fetch("http://localhost:5000/users",{ 
                method :"GET",
                headers:{
                    "content-type":"application/json",
                    "Authorization":"Bearer " +store.accessToken,
                }
            })
            .then((response)=>response.json())
            .then((data)=>setStore({ 
                usersList: data,
            })) 
            .then((error)=>console.log(error))
            } /*else{
                alert("missing access token")

            }
              */
       
            }}
        
        }
    }
