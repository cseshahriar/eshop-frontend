import React, {useEffect, useState} from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import {useNavigate, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import FormContainer from '../components/FormContainer'
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from "../actions/cartActions";

// import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;
    if(!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <h1 className="text-center">Payment</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='paymentMethod'>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Paypal or Credit Card"
                        id="paypal"
                        name="paymentMethod"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Form.Group>

                <Button type='submit' variant='primary' className="mt-3">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;