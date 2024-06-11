import React from 'react';
import ProductUploadForm from '../components/product_upload_form';

const ProductUploadView = () => {

    return (
        <div className="product-upload-container">
            <div/>
            <h1 className='d-flex justify-content-center'>Subir Producto</h1>
            <ProductUploadForm />
        </div>
    );
};

export default ProductUploadView;
