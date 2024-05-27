import React, { useContext, useEffect } from 'react';
import { Context } from '../store/context';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Notifications = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getNotifications();
        actions.getUserInterested();
        actions.getUserInterestedProduct();
    }, []);

    return (
        <div className="container mt-5">

            <ul>{store.useroffer.map((product, index) =>
                <li className='product_card col-3 border d-inline-flex p-2 mt-4 mx-2 ' key={index}>

                    <Card style={{ width: '15 rem', }}>
                        <Card.Img className="cardimg" variant="top" src={store.interestedproduct[index].photo} />
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold", fontSize: "25px" }}>{store.interestedproduct[index].product_info}</Card.Title>


                        </Card.Body>
                    </Card>



                </li>)}


            </ul>

        </div>
    );
};

export default Notifications;
