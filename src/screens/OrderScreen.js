import React, {useEffect, useState} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import {Link, useNavigate, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {createDetailsActions, orderPayActions, deliverOrder} from "../actions/orderActions";

import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from "../constants/orderConstants";
import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get id from url
    const { id } = useParams();

    const [sdkReady, setSdkReady] = useState(false);

    // get order from state
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    // order pay
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay } = orderPay;

    // get order delivery
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // calculate order
    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }
    const addPaypalScript = () => {
        const script  = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://www.paypal.com/sdk/js?client-id=AT_rXD0u9u5_TXMkI1sL_0cDIPt6G5J12XMkOOBBKQYhBDAw1KOFy153OYE2tCMFGSIMpRTpyQszOgtT&enable-funding=venmo&currency=USD";
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script);
    }

    useEffect(() => {
        if(!userInfo) {
            navigate('/login');
        }

        if(!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_DELIVER_RESET})

            dispatch(createDetailsActions(id));
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, id, successPay, successDeliver]); // change if success change or location change


    const successPaymentHandler = (paymentResult) => {
        dispatch(orderPayActions(id, paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    }

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order.Id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping </h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {' '}
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems.length === 0 ? <Message variant="info">
                                    Order is empty
                                </Message> : (
                                    <ListGroup variant="flush">
                                        {
                                            order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>$ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (

                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderScreen;