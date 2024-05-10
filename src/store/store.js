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
            publishedProducts: [],
            loginValidation: false,
            registerValidation: false,
            categoryProducts: [{
                name: "producto1",
                price: 19000,
                photo: "15615616",
                product_info: "producto1",
                brand: "producto1",
            },
             {  name: "producto2",
                price: 1111 ,
                photo: "producto2",
                product_info: "producto2",
                brand: "producto2",
            }]

        },
        actions: {

            handleOnchange: (event) => {
                const store = getStore()
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
            handleSubmitLogin: async (e) => {
                const store = getStore()
                let validation = store.loginValidation
                await fetch("http://localhost:5000/user/login", {
                    method: "POST",
                    body: JSON.stringify(store.user),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.json())
                    }
                    return response.json()


                })
                    .then((data) => {
                        localStorage.setItem("accessToken", data.access_token);
                        console.log(data)
                        validation = true
                    })
                    .catch((error) => console.log(error))
                return validation
            },

            logout: () => {
                localStorage.removeItem("accessToken")
                console.log("logout")

            },

            handleSubmitGoogleuser: async (user) => {
                const store = getStore()
                let validation = store.loginValidation
                await fetch("http://localhost:5000/user/logingoogle", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem("accessToken", data.access_token);
                        console.log(data)
                        validation = true

                    })
                    .catch((error) => console.log(error))
                return validation
            },

            accessTokenExpired: () => {
                let accessToken = localStorage.getItem("accessToken")
                if (accessToken) {
                    fetch("http://localhost:5000/users", {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            Authorization: "Bearer " + accessToken
                        }
                    }).then((response) => response.json())
                        .then((data) => { data.msg === "Token has expired" ? localStorage.removeItem("accessToken") : console.log("accessTokenValid") })
                        .catch((error) => console.log(error))
                }
                else {
                    console.log("need aut token")
                }

            },


            handleSubmituser: async () => {
                const store = getStore()
                let validation = store.registerValidation

                await fetch("http://localhost:5000/user/register", {
                    method: "POST",
                    body: JSON.stringify(store.user),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(validation = true)
                    .catch((error) => console.log(error))

                return validation
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


            getIntercambios: () => {
                const store = getStore();
                if (store.accessToken) {
                    fetch("http://localhost:5000/intercambios", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + store.accessToken,
                        }
                    })
                        .then((response) => response.json())
                        .then((data) => setStore({
                            intercambiosList: data,
                        }))
                        .catch((error) => console.error('Hubo un problema con la operación fetch:', error));
                } else {
                    alert("Falta el token de acceso");
                }
            }


        }
    }
};











