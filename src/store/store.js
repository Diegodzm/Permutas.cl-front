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
            selectedProduct: null,
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
                    photo: "https://www.realkicks.cl/cdn/shop/files/p-38583918-1_1200x.jpg?v=1688677846",
                    price: 25000,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                },
                {
                    name: "zapatillaNike",
                    photo:"https://assets.adidas.com/images/w_600,f_auto,q_auto/02cd9a97ce874d89ba17ae2b003ebe50_9366/Zapatillas_adidas_Grand_Court_Lifestyle_para_Tenis_con_Cordones_Blanco_GW6511_01_standard.jpg",
                    price: 25,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                },
                {
                    name: "zapatillaJordan23",
                    photo: "https://chalada.cl/cdn/shop/files/zapatilla-funway-mujer-biggerh-1-negro-moda-zapatillas-funway-967292_1200x.jpg?v=1707160572",
                    price: 250002,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                },
                {
                    name: "zapatillaPailitaSutro",
                    photo: "https://northstar.digitag.cl/52646-large_default/zapatillas-nina-hem.jpg", 
                    price: 250003,
                    product_info: "buenas zapatillas",
                    brand: "nike"
                }
            ],

            UserProductForPermuta: [
                
                {}
              

            ],

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
                const {name, value} = formData.target
                productForm[name]=value 
                setStore({
                    productForm: productForm
                })
                /* setStore((prevState) => ({
                    productForm: {
                        ...prevState.productForm,
                        ...formData
                    }
                })); */
                console.log (getStore().productForm)
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
                setStore({validation: false})
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

                if (store.productForm.photo === "") {
                    console.log("La URL de la foto está vacía. No se puede subir el producto.");
                    return; 
                }

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

                        setStore({ 
                            productForm: {
                                name: "", 
                                photo: "",
                                price: 0, 
                                product_info: "", 
                                brand: "", 
                                category_id: 0,
                            } 
                        });
                    })
                    .catch((error) => console.log(error));
            },

            setSelectedProduct:async (product) => {
               await setStore({ selectedProduct: product });
               return true 
            }, 





        }
    }
};











