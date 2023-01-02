import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';

// redux
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Product from '../components/Product';
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
    // useDispatch returns the store's dispatch method to let you dispatch actions
    const dispatch = useDispatch();
    // useSelector reads a value from the store state and subscribes to updates
    const productList = useSelector(state => state.productList);
    const {error, loading, products} = productList;

    useEffect(() => {
        dispatch(listProducts()); // action trigger
    }, [dispatch]); // when component load

  return (
    <div>
        <h1>Latest products</h1>
        {
            loading ? <Loader/>
                : error ? <Message variant="danger">{error}</Message>
                    : <Row>
                            {products.map((product) => (
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