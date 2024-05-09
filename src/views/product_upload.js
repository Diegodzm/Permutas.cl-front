

import React, { useState, useContext } from 'react';
import { Context } from '../store/context';
import ProductUploadForm from '../components/product_upload_form';

const ProductUploadView = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        photo: '',
        product_info: '',
        brand: '',
        category_id: ''
    });

    return (
        <div>
            <h1>Product Submit</h1>
            <ProductUploadForm formData={formData} setFormData={setFormData} handleProductOnChange={actions.handleProductOnChange} handleProductUpload={actions.handleProductUpload} />
        </div>
    );
};

export default ProductUploadView;
