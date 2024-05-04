export const getState = ({ getActions, getStore, setStore }) => {
    return {
        store: {
<<<<<<< HEAD
            user: {
=======
            user:{
>>>>>>> 657cb120d2e2a63730e463cfa7b5c686ed10357a
                username: "",
                firstname:"",
                lastname:"",
                password: "",
<<<<<<< HEAD
                email: "",
                address: "",
=======
                email: ""
                
>>>>>>> 657cb120d2e2a63730e463cfa7b5c686ed10357a
            },
            accessToken: "secret-code-01",
            usersList: [],
            productForm: {
                name: "",
                price: 0,
                photo: "",
                product_info: "",
                brand: "",
                category_id: ""
            },
            userProducts: [],
            publishedProducts: []
        },
        actions: {
<<<<<<< HEAD
            handleOnchange: (event) => {
                const store = getStore();
=======
            handleOnchange: (event)=>{
                const store= getStore()
>>>>>>> 657cb120d2e2a63730e463cfa7b5c686ed10357a
                setStore({
                    user: {
                        ...store.user,
                        [event.target.name]: event.target.value
                    }
                });
            },

            handleProductOnChange: (event) => {
                const store = getStore();
                setStore({
                    productForm: {
                        ...store.productForm,
                        [event.target.name]: event.target.value
                    }
                });
                console.log(store.productForm)
            },
            handleSubmitUser: (event) => {
                const store = getStore();
                event.preventDefault();
                fetch("http://localhost:5000/user/register", {
                    method: "POST",
                    body: JSON.stringify(store.user),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
<<<<<<< HEAD
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error));
            },
            handleSubmitLogin: (event) => {
                const store = getStore();
                event.preventDefault();
                fetch("http://localhost:5000/user/login", {
                    method: "POST",
                    body: JSON.stringify(store.user),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({
                            accessToken: data.access_token
                        });
                    })
                    .catch((error) => console.log(error));
=======
                
                
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
>>>>>>> 657cb120d2e2a63730e463cfa7b5c686ed10357a
            },
            getUsers: () => {
                const store = getStore();
                if (store.accessToken) {
                    fetch("http://localhost:5000/users", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + store.accessToken
                        }
                    })
                        .then((response) => response.json())
                        .then((data) => setStore({
                            usersList: data
                        }))
                        .catch((error) => console.log(error));
                } /*else {
                    alert("Missing access token");
                } */
            },
<<<<<<< HEAD
            handleProductUpload: (event) => {
                const store = getStore();
                event.preventDefault();
             
                fetch("http://localhost:5000/products/upload", {
                    method: "POST",
                    body: JSON.stringify(store.productForm),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.accessToken
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        getActions().fetchUserProducts();
                    })
                    .catch((error) => console.log(error));
            },
            handleProductPublish: (productId) => {
                const store = getStore();
                fetch(`http://localhost:5000/products/${productId}/publish`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.accessToken
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        getActions().fetchPublishedProducts();
                    })
                    .catch((error) => console.log(error));
            },
            fetchUserProducts: () => {
                const store = getStore();
                fetch("http://localhost:5000/products/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.accessToken
                    }
                })
                    .then((response) => response.json())
                    .then((data) => setStore({
                        userProducts: data
                    }))
                    .catch((error) => console.log(error));
            },
            fetchPublishedProducts: () => {
                const store = getStore();
                fetch("http://localhost:5000/products/published", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.accessToken
                    }
                })
                    .then((response) => response.json())
                    .then((data) => setStore({
                        publishedProducts: data
                    }))
                    .catch((error) => console.log(error));
            }
=======

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
        
>>>>>>> 657cb120d2e2a63730e463cfa7b5c686ed10357a
        }
    };
};






