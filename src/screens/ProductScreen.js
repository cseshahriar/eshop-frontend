import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const [qty, setQty] = useState(1);

    console.log("params id", params.id)
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(params.id)); // action trigger
    }, [dispatch]); // when component load

    const addToCartHandler = () => {
        console.log(qty);
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {
                loading ?
                    <Loader/>
                    : error
                    ? <Message variant="danger">{error}</Message>
                    : (
                        <Row>
                            <Col md={6}>
                                <Image src={product.img_url} alt={product.name} fluid />
                            </Col>

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                            color={'#f8e825'}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col>
                                                    <strong>$ {product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {
                                                        product.countInStock > 0
                                                            ? <span className="text-success">In Stock</span>
                                                            : <span className="text-danger">Out of Stock</span>
                                                    }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        { product.countInStock > 0  && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty: </Col>
                                                    <Col xs="auto" className="my-1">
                                                        <Form.Select aria-label="Default select example"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((el) => (
                                                                    <option value={el + 1 } key={ el + 1 }>{ el + 1}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}


                                        <ListGroup.Item className="text-center">
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn btn-block"
                                                type="button"
                                                disabled={product.countInStock == 0}
                                            >Add to Cart</Button>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </div>
    );
};

export default ProductScreen;