import React, {useEffect} from 'react';
import {Link, useParams, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap";

import Message from "../components/Message";
import {addToCart, removeFromCart} from "../actions/cartActions";

function CartScreen() {
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    // get data from state
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart
    console.log(cartItems);

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems && cartItems.length === 0 ? (
                        <Message variant='info'>Your cart is empty <Link to="/">Go Back</Link></Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.img_url} alt={item.name} fluid rounded />
                                            </Col>

                                             <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={2}>
                                                ${item.price}
                                            </Col>

                                            <Col md={3}>
                                                <Form.Select aria-label="Default select example"
                                                   value={item.qty}
                                                   onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((el) => (
                                                            <option value={el + 1 } key={ el + 1 }>{ el + 1}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Col>

                                            <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({
                                cartItems.reduce((acc, item) => acc + item.qty, 0)
                            }) Items</h2>

                            $ {
                                cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
                            }

                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;