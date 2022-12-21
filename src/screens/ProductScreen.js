import React from 'react';
import {useParams} from 'react-router-dom';

import products from '../products';

function ProductScreen() {
    const params = useParams();
    const product = products.find((el) => {
        return el._id == params.id
    });

    console.log('product', product);

    return (
        <div>
            {product.name}
        </div>
    );
};

export default ProductScreen;