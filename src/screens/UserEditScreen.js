import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";

import FormContainer from '../components/FormContainer'
import { getUserDetails } from "../actions/userActions"
import Loader from "../components/Loader";
import Message from "../components/Message";



function UserEditScreen() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    const userDetails = useSelector(state => state.userDetails);
    const {error, loading, user} = userDetails;

    useEffect(() => {
        if(!user.name || user._id !== Number(id)) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user, id]);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <Link to="/admin/userlist">Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
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

                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is Admin'
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >
                                    </Form.Check>
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

export default UserEditScreen;