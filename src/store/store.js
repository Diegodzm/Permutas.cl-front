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
            accessToken: "",
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
            handleOnchange: (event)=>{
                const store= getStore()
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
                
                
                console.log(store.user)
            },
           
            handleSubmitGoogleuser:(user)=>{
                fetch("http://localhost:5000/user/logingoogle",{ 
                method :"POST",
                body: JSON.stringify(user),
                headers:{
                    "Content-Type":"application/json"
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
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .then((error)=>console.log(error))
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
                } else {
                    alert("Missing access token");
                } 
            },
            handleProductUpload: (event) => {
                const store = getStore();
                event.preventDefault();
             
                fetch("http://localhost:5000/products/upload", {
                    method: "POST",
                    body: JSON.stringify(store.productForm),
                    headers: {
                        "Content-Type": "application/json",
                        /*"Authorization": "Bearer " + store.accessToken*/
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        /*getActions().fetchUserProducts();*/
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
        }
    };
};






