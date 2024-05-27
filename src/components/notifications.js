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

            <h1>en construccion...
            </h1>

        
    );
};

export default Notifications;
