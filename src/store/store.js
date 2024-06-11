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
            selectedOfferProduct: [],
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
            useroffer: [],
            notificationdisplay: [],
            offeredproduct: [],
            userwishlist: [],
            validation: false,
            objetoOferta: [],
            tradeinfo:[],
            userindexpermutacompleta:0


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
            setSelectedOfferProduct: (product) => {
                setStore({ selectedOfferProduct: product });
                const store = getStore()
                console.log(store.selectedOfferProduct)
                console.log(store.selectedProduct)
                console.log("producto seleccionado")
                const objetoOferta = store.selectedProduct
                objetoOferta.user_interested = store.selectedOfferProduct.user_id
                objetoOferta.brand_interested = store.selectedOfferProduct.brand
                objetoOferta.photo_interested = store.selectedOfferProduct.photo
                objetoOferta.info_interested = store.selectedOfferProduct.product_info
                setStore({ objetoOferta: objetoOferta })
                console.log(store.objetoOferta)

                return true
            },
      

            showOfferIndex: (index) => {
                setStore({ productIndex: index })

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
                console.log(getStore().productForm)
            },
            getWishlist: () => {
                const store = getStore()
                fetch("http://localhost:5000/wishlist/" + store.user_id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({
                            userwishlist: data
                        })
                        console.log(store.userwishlist)

                    })
                    .catch((error) => console.log(error));



            },

            addWishedproduct: (product) => {
                const store = getStore()
                console.log(product)
                fetch("http://localhost:5000/products/wishlist/" + store.user_id, {
                    method: "POST",
                    body: JSON.stringify(product),
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
                    console.log(data);
                    console.log("producto agregado");
                    
                    setStore({ userwishlist: [...store.userwishlist, product] });
                })
                    .catch((error) => console.log(error))



            },

            removeWishedProduct : (product_i_d) => {
                const store = getStore()
                const userId = store.user_id
                
                if (!product_i_d) {
                    console.error("product_i_d is not defined");
                    return;
                }

                fetch(`http://localhost:5000/products/wishlist/` + product_i_d + "/" + userId , {
                    method: "DELETE"
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el producto de la lista de deseos');
                    }
                    return response.json();
                })
                .then((data) => {
                    setStore({ userwishlist: data });
                    console.log("Estado actualizado después de eliminar:", getStore());
                })
                .catch((error) => console.error(error));
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
                
                let accessToken = localStorage.getItem("accessToken")
                setStore({ productSended: false })
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
                            
                        })
                        .catch((error) => console.log(error))
                }
            },

            fetchPublishedProducts: () => {
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
                        console.log("Data received from backend:", data);
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
          

            selectedOfferProduct: (product) => {
                setStore({ selectedOfferProduct: product });
                const store = getStore()
                console.log(store.selectedOfferProduct)
                console.log("producto seleccionado")
                return true
            },

            offerIndex: (index) => {
                setStore({ productIndex: index })

            },


            setSelectedProduct: (product) => {
                setStore({ selectedProduct: product });
                console.log("producto seleccionado")
                return true
            },

            showIndex: (index) => {
                setStore({ productIndex: index })

            },

            handleOfferTradeButtonClick: async (amount) => {
                const store = getStore()
                const offered_product = store.objetoOferta
                offered_product.amount = amount

                await fetch("http://localhost:5000/offerupload", {
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
                fetch("http://localhost:5000/Email/" + usercatch, {
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
                fetch("http://localhost:5000/notifications/" + store.user_id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setStore({ usernotifications: data })

                    })
                    .catch((error) => console.log(error));
            },
            getoffertrade: () => {
                const store = getStore()


                fetch("http://localhost:5000/offertrade", {
                    method: "POST",
                    body: JSON.stringify(store.usernotifications),
                    headers: {  
                        "content-type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {setStore({tradeinfo:data})
                
                }

                )
                    .catch((error) => console.log(error))


 


            },


            deleteProduct: async (productId) => {
                const store = getStore();
            
                await fetch(`http://localhost:5000/products/delete/${productId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                      
                        console.log("Producto eliminado correctamente");
                    } else if (response.status === 404) {
                       
                        console.log("Producto no encontrado");
                    } else {
                      
                        console.log("Error al eliminar el producto");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            },

            currencyFormatter(value) {
                const formatter = new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: 'CLP'
                });
                return formatter.format(value);
              },
              

            
            


            delOffer:(index)=>{
                const store= getStore()
                const delofferobject= store.usernotifications[index]
                console.log(store.usernotifications[index])
                

                fetch("http://localhost:5000/deloffer", {
                    method: "PUT",
                    body: JSON.stringify(delofferobject),
                    headers: {  
                        "content-type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {setStore({usernotifications:data})})
                
                   
                    
                
                .catch((error) => console.log(error))


            },
            permutacompletaindex:(index)=>{
                const store= getStore()

                setStore({userindexpermutacompleta:index})
                console.log(store.userindexpermutacompleta)
                console.log(store.tradeinfo)



            },
      





        },
    }
}
















