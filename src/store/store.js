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
            userProducts: [],
            publishedProducts: [],
            categoryProducts: [],
            loginValidation: false,
            registerValidation: false,
            contacto: {
                destinatario: '',
                mensaje: '',
            },
            UserProductOfferList: [],

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
                        ...store.productForm,
                        [event.target.name]: event.target.value,


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
                        setStore({ validation: true, user_id: data.user_id,username:data.username })
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
            handleExchangeRequest: (userId, productId, recipientEmail, exchangeDetails) => {
                fetch('http://localhost:3001/exchange-request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "user_id": store.userId, "product_id": store.productId, recipientEmail, exchangeDetails })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => console.error(error));
            },

            /*submitExchangeRequest: (exchangeDetails) => {
                const store = getStore();
                const { user_id } = store;
                const { productId, recipientEmail, details } = exchangeDetails;
                const actions = getActions();
            setSelectedProduct:(product) => {
                setStore ({ selectedProduct: product });
               const store= getStore()
               console.log(store.selectedProduct)
               console.log("producto seleccionado")
               return true 
            }, 


                actions.handleExchangeRequest(user_id, productId, recipientEmail, details);
            },*/
        }
    }
};















