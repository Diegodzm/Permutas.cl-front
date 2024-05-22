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
            user_id: 0,
            accessToken: "",
            productForm: {
                name: "",
                price: 0,
                photo: "",
                product_info: "",
                brand: "",
                category_id: 0,
                user_id: 0,
            },
            userProducts: [],
            publishedProducts: [],
            validation: false,
            productSended: false,
            categoryProducts: [],
            wishedList: [],
            username:""

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
                        [event.target.name]: event.target.value,


                    }
                });
                console.log(store.productForm)
            },
            handleSubmitLogin: async (e) => {
                const store = getStore()
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
                        localStorage.setItem("user_id",data.user_id)
                        setStore({ validation: true, user_id: data.user_id,username:data.username })
                        console.log(store.user_id)

                    })
                    .catch((error) => console.log(error))
                return store.validation
            },

            logout: () => {
                localStorage.removeItem("accessToken")
                console.log("logout")

            },

            handleSubmituser: async () => {
                const store = getStore()



                await fetch("http://localhost:5000/user/register", {
                    method: "POST",
                    body: JSON.stringify(store.user),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error))

                return true
            },

            handleSubmitGoogleuser: async (user) => {
                const store = getStore()

                await fetch("http://localhost:5000/user/logingoogle", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem("user_id",data.user_id)
                        localStorage.setItem("accessToken", data.access_token);
                        console.log(data)
                        setStore({ validation: true, user_id: data.user_id,username:data.username })
                        console.log(store.user_id)

                    })
                    .catch((error) => console.log(error))

                return store.validation
            },

            accessTokenExpired: () => {
                const store = getStore()
                let accessToken = localStorage.getItem("accessToken")
                setStore({productSended:false})
                if (accessToken) {
                    fetch("http://localhost:5000/users", {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            Authorization: "Bearer " + accessToken
                        }
                    }).then((response) => response.json())
                        .then((data) => {
                            if (data.msg === "Token has expired") {
                                localStorage.removeItem("accessToken")
                                setStore({ validation: false })
                            }
                            else { console.log("accessTokenValid") }
                            setStore({ validation: true })
                        })
                        .catch((error) => console.log(error))
                }
                else {
                    console.log("need aut token")
                }

            },

            fetchPublishedProducts: () => {
                ;
                const store = getStore()
                fetch("http://localhost:5000/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({
                            publishedProducts: data
                        })
                        console.log(store.publishedProducts)
                    })
                    .catch((error) => console.log(error));
            },
            setCategory: (index) => {

                const store = getStore()

                setStore({
                    productForm: { ...store.productForm, category_id: index, user_id: store.user_id }
                })


            },
            getProductsbyCategory: (id) => {
                const store = getStore()
                fetch("http://localhost:5000/category/products/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({
                            categoryProducts: data
                        })
                        console.log(store.categoryProducts)
                    })
                    .catch((error) => console.log(error));
            },
            getProductsbyUser: () => {

                const store = getStore()
                fetch("http://localhost:5000/products/user/" + store.user_id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({
                            userProducts: data
                        })
                        console.log(store.userProducts)
                    })
                    .catch((error) => console.log(error));
            },


            ProductUpload: async (event) => {
                console.log("Manejador de envío de producto ejecutándose...");
                const store = getStore();
                console.log("Datos del formulario:", store.productForm);


                await fetch("http://localhost:5000/products/upload", {
                    method: "POST",
                    body: JSON.stringify(store.productForm),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        console.log("Respuesta del servidor:", data);
                        console.log(data);
                        if(data.msg==="product uploaded"){
                            setStore({ productSended: true, productForm: {
                                name: "",
                                price: 0,
                                photo: "",
                                product_info: "",
                                brand: "",
                                category_id: 0,
                                user_id: 0,
                            }  })
                        }
                        
                    })
                    .catch((error) => console.log(error));

                return store.productSended  

            },





        }
    }
};











