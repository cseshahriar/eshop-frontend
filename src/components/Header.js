import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {useNavigation} from "react-router-dom";

import {logout} from "../actions/userActions";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo } = userLogin;
    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(logout());
        navigate('/');
    }

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
        <Container>

          <LinkContainer to="/">
            <Navbar.Brand>EShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {
                    userInfo ? (
                        <>
                            <LinkContainer to="/cart">
                                <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>

                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item><i className="fas fa-user"></i> Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logOutHandler}><i className="fas fa-sign-out"></i> Logout</NavDropdown.Item>

                            </NavDropdown>
                        </>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-sign-in"></i> Sign In</Nav.Link>
                        </LinkContainer>
                    )
                }


            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header;