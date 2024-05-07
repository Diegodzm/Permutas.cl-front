export const getState = ({ getActions, getStore, setStore }) => {
    return {
        store: {
            user: {
                username: "",
                firstname: "",
                lastname: "",
                password: "",
                email: ""
            },
            usersList: [],
            accessToken:"",
           
        },
        actions: {

            handleOnchange: (event) => {
                const store = getStore()
                setStore({
                    user: {
                        ...store.user,
                        [event.target.name]: event.target.value

                    }
                })


                console.log(store.user)
            },

            handleSubmitGoogleuser: (user) => {
                const store= getStore()
                fetch("http://localhost:5000/user/logingoogle", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response) => response.json())
                .then((data) => {          
                    setStore({
                            accessToken: data.access_token,
                        });
                        console.log(store.accessToken);
                        localStorage.setItem("accessToken", data.access_token);
                    })
                    .catch((error) => console.log(error))

            },

            handleSubmituser: (event) => {
                const store = getStore()
                event.preventDefault()
                fetch("http://localhost:5000/user/register", {
                    method: "POST",
                    body: JSON.stringify(store.user),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error))
            },

            handleSubmitLogin: (event) => {
                const store = getStore()
                event.preventDefault()
                fetch("http://localhost:5000/user/login", {
                    method: "POST",
                    body: JSON.stringify(store.user),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                 .then((response) => response.json())
                 .then((data) => {
                        setStore({
                            accessToken: data.access_token,

                        })
                        localStorage.setItem("accessToken", data.access_token);
                        console.log(getStore().accessToken)
                    })
                 .catch((error) => console.log(error))
            }, 

            getUsers: () => {
                const store = getStore()
                let accessToken = localStorage.getItem("accessToken")
                console.log(store)
                if(accessToken){
                    fetch("http://localhost:5000/users", {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            Authorization: "Bearer "+ accessToken
                        }
                    }).then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error))
                }
                else{
                    alert("missing access token")}
                    console.log(store.accessToken) 
 

            }
        }

    }
}
