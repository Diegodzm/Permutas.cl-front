export const getState = ({ getActions, getStore, setStore }) => {
    return {
        store: {
            user: {
                username: "",
                firstname: "",
                lastname: "",
                password: "",
                email: "",
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
            selectedProduct: [],
            productIndex: 0,
            userProducts: [],
            publishedProducts: [],
            categoryProducts: [],
            loginValidation: false,
            registerValidation: false,
            contacto: {
                destinatario: '',
                mensaje: '',
            },
            usernotifications: [],

            UserProductForPermuta: [

                {}


            ],
            useroffer: [],
            interestedproduct: [],



            validation: false,

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

            handleProductOnChange: (formData) => {
                console.log(formData)
                const store = getStore()
                const productForm = store.productForm
                const { name, value } = formData.target
                productForm[name] = value
                setStore({
                    productForm: productForm
                })
                /* setStore((prevState) => ({
                    productForm: {
                        ...store.productForm,
                        [event.target.name]: event.target.value,


                        ...prevState.productForm,
                        ...formData
                    }
                })); */
                console.log(getStore().productForm)
            },


            handleSubmitLogin: async (e) => {
                const store = getStore()
                await fetch("http://localhost:3001/user/login", {
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
                        setStore({ validation: true, user_id: data.user_id, username: data.username })
                        console.log(store.user_id)

                    })
                    .catch((error) => console.log(error))

                return store.validation
            },

            logout: () => {
                localStorage.removeItem("accessToken");
                console.log("logout");
                setStore({ validation: false })
            },

            handleSubmituser: async () => {
                const store = getStore()



                await fetch("http://localhost:3001/user/register", {
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

                await fetch("http://localhost:3001/user/logingoogle", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem("user_id", data.user_id)
                        localStorage.setItem("accessToken", data.access_token);
                        console.log(data)
                        setStore({ validation: true, user_id: data.user_id, username: data.username })
                        console.log(store.user_id)

                    })
                    .catch((error) => console.log(error))

                return store.validation
            },

            accessTokenExpired: () => {
                const store = getStore()
                let accessToken = localStorage.getItem("accessToken")
                setStore({ productSended: false })
                if (accessToken) {
                    fetch("http://localhost:3001/users", {
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
                fetch("http://localhost:3001/products", {
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
                fetch("http://localhost:3001/category/products/" + id, {
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
                fetch("http://localhost:3001/products/user/" + store.user_id, {
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

                    })
                    .catch((error) => console.log(error));
            },


            ProductUpload: async (event) => {
                console.log("Manejador de envío de producto ejecutándose...");
                const store = getStore();
                console.log("Datos del formulario:", store.productForm);

                if (store.productForm.photo === "") {
                    console.log("La URL de la foto está vacía. No se puede subir el producto.");
                    return;
                }

                await fetch("http://localhost:3001/products/upload", {
                    method: "POST",
                    body: JSON.stringify(store.productForm),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        console.log("Respuesta del servidor:", data);
                        console.log(data);
                        if (data.msg === "product uploaded") {
                            setStore({
                                productSended: true, productForm: {
                                    name: "",
                                    price: 0,
                                    photo: "",
                                    product_info: "",
                                    brand: "",
                                    category_id: 0,
                                    user_id: 0,
                                }
                            })
                        }

                    })
                    .catch((error) => console.log(error));

                return store.productSended

            },


            setSelectedProduct: (product) => {
                setStore({ selectedProduct: product });
                const store = getStore()
                console.log(store.selectedProduct)
                console.log("producto seleccionado")
                return true
            },

            showIndex: (index) => {
                setStore({ productIndex: index })

            },

            handleOfferTradeButtonClick: async (amount) => {
                const store = getStore()
                const offered_product = store.publishedProducts[store.productIndex]
                offered_product.user_interested = store.user_id
                console.log(offered_product)
                console.log(store.publishedProducts[store.productIndex].user_id)
                offered_product.amount = amount
                await fetch("http://localhost:3001/offerupload", {
                    method: "POST",
                    body: JSON.stringify(offered_product),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                    })

                    .catch((error) => console.log(error));
                return true


            },

            getOfferedUser: () => {

                const store = getStore()
                const usercatch = store.publishedProducts[store.productIndex].user_id
                fetch("http://localhost:3001/Email/" + usercatch, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)

                    })
                    .catch((error) => console.log(error));
            },

            getNotifications: () => {

                const store = getStore()
                fetch("http://localhost:3001/notifications/" + store.user_id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        setStore({ usernotifications: data })

                    })
                    .catch((error) => console.log(error));
            },
            getUserInterested: () => {

                const store = getStore()
                for (let i = 0; i < store.usernotifications.length; i++) {
                    const user_interested = store.usernotifications[i].user_interested
                    fetch("http://localhost:3001/usernotifications/" + user_interested, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            setStore({useroffer:data})

                        })
                        .catch((error) => console.log(error));
                }
                

            },
            getUserInterestedProduct: () => {

                const store = getStore()
                for (let i = 0; i < store.usernotifications.length; i++) {
                    const user_interestedproduct = store.usernotifications[i].product_id
                    fetch("http://localhost:3001/userinterestedproduct/" + user_interestedproduct, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data) 
                            setStore({interestedproduct:data})

                        })
                        .catch((error) => console.log(error));
                }
                

            },



        },
    }
}
















