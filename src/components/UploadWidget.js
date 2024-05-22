import React, { useEffect, useRef, useState } from "react";
import { Button } from 'react-bootstrap';

const UploadWidget = ({ onUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'drzqmh3cj',
            uploadPreset: 'edxfjlkc'
        }, function (error, result){
            if (!error && result && result.event === "success") {
                const imageUrl = result.info.url;
                onUpload(imageUrl);
                console.log('la url de la imágen es:', imageUrl);
            }
        });
    }, [onUpload]);

    const handleButtonClick = () => {
        widgetRef.current.open();
    };

    return (
        <div>
            <Button variant="info" style={{ backgroundColor: '#049a8f', borderColor: '#049a8f' }} onClick={handleButtonClick}>
                Subir Imagen
            </Button>
            
        </div>
    );
}

export default UploadWidget;



