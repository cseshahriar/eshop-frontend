import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(location.search)
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                <i className="fa fa-search fa-2x"></i>
            </Button>
        </Form>
    )
}

export default SearchBox;