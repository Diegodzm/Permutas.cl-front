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
            usersList: [],
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
            categoryProducts: [],
            loginValidation: false,
            registerValidation: false,
            contacto: {
                destinatario: '',
                mensaje: '',
            },
            UserProductOfferList: [
                {
                    name: "zapatilla",
                    price: 25000,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                },
                {
                    name: "zapatillaNike",
                    price: 25,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                },
                {
                    name: "zapatillaJordan23",
                    price: 250002,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                },
                {
                    name: "zapatillaPailitaSutro",
                    price: 250003,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                }
            ],

            UserProductForPermuta: [
                {
                    photo: "https://www.semana.com/resizer/UZ2pD8YgPJcQS2B9nGsZEH1pqeY=/fit-in/1280x0/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/4GDPNFO3X5HKZC6KCFPXBWKTBQ.jpg",
                    name: "Guitarra de michel jackson",
                    price: 25000,
                    product_info: "buena guitarra",
                    brand: "EEUU",

                },

            ],

            validation: false,

            categoryProducts: [],

        },


        actions: {
            handleOnchange: (event) => {
                const store = getStore();
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
                        throw new Error(response.json());
                    }
                    return response.json();
                })
                    .then((data) => {
                        localStorage.setItem("accessToken", data.access_token);
                        setStore({ validation: true, user_id: data.user_id })
                        console.log(store.user_id)

                    })
                    .catch((error) => console.log(error))
                return store.validation
            },

            logout: () => {
                localStorage.removeItem("accessToken");
                console.log("logout");
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
                        localStorage.setItem("accessToken", data.access_token);
                        console.log(data)
                        setStore({ validation: true, user_id: data.user_id })
                        console.log(store.user_id)

                    })
                    .catch((error) => console.log(error))

                return store.validation
            },

            accessTokenExpired: () => {
                let accessToken = localStorage.getItem("accessToken");
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
                    })
                    .catch((error) => console.log(error));
            },





        }
    }
};











