import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listProducts, ProductDeleteAction, productCreateAction } from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: deleteLoading, error: errorDelete, success: deleteSuccess } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: createLoading, error: createError, success: createSuccess,
        product: createdProduct
    } = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET});
        if (!userInfo.isAdmin) {

            navigate('/login')
        }

        if(createSuccess) {
            navigate(`/admin/product/${productCreate.id}/edit/`)
        } else {
            dispatch(listProducts());
        }
    }, [
        dispatch, navigate, userInfo, deleteSuccess,
        createSuccess, createdProduct
    ]);

    const createProductHandler = () => {
        dispatch(productCreateAction());
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(ProductDeleteAction(id));
            // window.location.reload(true);
        }
    }

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            { deleteLoading && <Loader/> }
            { errorDelete && <Message variant="danger"> {errorDelete}</Message> }

            { createLoading && <Loader/> }
            { createError && <Message variant="danger"> {createError}</Message> }

            {
                loading
                    ? (<Loader />)
                    : error
                        ? (<Message variant="danger">{error}</Message>)
                        : (
                            <Table striped bordered hover responsive className="table-sm">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {products.map( product => (
                                    <tr key={ product._id }>
                                        <td>{ product._id }</td>
                                        <td>{ product.name }</td>
                                        <td>${ product.price }</td>
                                        <td>{ product.category }</td>
                                        <td>{ product.brand }</td>

                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={ () => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>

                            </Table>
                        )
            }
        </div>
    );
};

export default ProductListScreen;