import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";

import FormContainer from '../components/FormContainer'
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProductDetails} from "../actions/productActions";


function ProductEditScreen() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    // for data
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');


    const [message, setMessage] = useState('');

    const productDetails = useSelector(state => state.productDetails);
    const {error, loading, product} = productDetails;

    useEffect(() => {
        if(!product.name || product._id !== Number(id)) {
            dispatch(listProductDetails(id));
        } else {
            // initialize old data
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }

    }, [product, id, navigate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        // update product
    }

    return (
        <div>
            <Link to="/admin/productlist">Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                { loading && <Loader/> }
                { error && <Message variant="danger">{error}</Message>}

                {
                    loading
                        ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='price'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter Price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='image'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Image'
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='brand'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Brand'
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId='category'>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Category'
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='countInStock'>
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Count In Stock'
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea"
                                            placeholder='Enter description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Button type='submit' variant='primary' className="mt-3">
                                        Update
                                    </Button>
                                </Form>
                            )
                }
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen;