import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from '../components/FormContainer'
import { listProductDetails, productUpdateAction } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET, PRODUCT_DELETE_REQUEST } from "../constants/productConstants";
import { BASE_API_URL } from "../constants/baseConstants";

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
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const productDetails = useSelector(state => state.productDetails);
    const {error, loading, product} = productDetails;
    console.log('product ', product, id);

    const productUpdate = useSelector(state => state.productUpdate);
    const {
        error: updateError,
        loading: updateLoading,
        success: updateSuccess
    } = productUpdate;

    useEffect(() => {
        if(updateSuccess) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            navigate('/admin/productlist');
        } else {
            if(!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, product, id, navigate, updateSuccess]);

    const submitHandler = (e) => {
        console.log('product update');
        e.preventDefault();
        // update product
        dispatch(productUpdateAction({
                _id: Number(id),
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            })
        )
    }


    const uploadFileHandler = async (e) => {
        // get file form fields
        const file = e.target.files[0];
        setImage(file);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('product_id', id);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post(
                `${BASE_API_URL}products/upload/`, formData, config
            );
            setImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    }

    return (
        <div>
            <Link to="/admin/productlist">Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                { updateLoading && <Loader/> }
                { updateError && <Message variant="danger">{updateError}</Message>}

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
                                        <img src={product.img_url} alt={product.name} className="img-thumbnail mt-2 mb-1" id="img-show" />
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={uploadFileHandler}
                                            label='Choose File'
                                        />
                                        {uploading && <Loader />}

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