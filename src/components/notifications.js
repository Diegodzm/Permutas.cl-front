import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Notifications = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getoffertrade()
        console.log(store.tradeinfo)
    }, [])




    
    if(store.useroffer!=[]){

        return (<div>
           {store.tradeinfo.map((product, index) => (
                <Card>
                    <h5>info del producto</h5>
                    <Link>{store.tradeinfo[index].product.name}</Link>
                    <Link>{store.tradeinfo[index].product.brand}</Link>
                    <Link>{store.tradeinfo[index].product.product_info}</Link>
                    <Link>{store.tradeinfo[index].product.photo}</Link>
                    <Link>{store.tradeinfo[index].product.price}</Link>
                    <h5>info del producto ofertado</h5>
                    <Link>{store.tradeinfo[index].product_offered.name}</Link>
                    <Link>{store.tradeinfo[index].product_offered.brand}</Link>
                    <Link>{store.tradeinfo[index].product_offered.product_info}</Link>
                    <Link>{store.tradeinfo[index].product_offered.photo}</Link>
                    <Link>{store.tradeinfo[index].product_offered.price}</Link>
                    
                    <h5>info usuario al que le llego la oferta</h5>
                    <Link>{store.tradeinfo[index].user.email}</Link>
                    <Link>{store.tradeinfo[index].user.firstname}</Link>
                    <Link>{store.tradeinfo[index].user.username}</Link>
                    <h5>info usuario interesado</h5>
                    <Link>{store.tradeinfo[index].user_interested.email}</Link>
                    <Link>{store.tradeinfo[index].user_interested.firstname}</Link>
                    <Link>{store.tradeinfo[index].user.username}</Link>
                    <Link>asdasdasd</Link>
    
    
    
                </Card>
    
    
    
    
            ))}
        </div>
    
        );  


    }
    
    
};

export default Notifications;
