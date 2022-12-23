import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {listProducts} from "../actions/productActions";

import Product from '../components/Product';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {error, loading, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]); // when component load

  return (
    <div>
        <h1>Latest product</h1>
        {
            loading ? <h2>Loading...</h2>
                : error ? <h3>{error}</h3>
                    : <Row>
                            {products && products.map((product) => (
                                <Col key={product._id} sn={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                    </Row>
        }
    </div>
  )
}

export default HomeScreen;