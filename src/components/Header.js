import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import SearchBox from "./SearchBox";
import {logout} from "../actions/userActions";

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
            <Nav className="me-auto">
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
                        <>
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-sign-in"></i> Sign In</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link><i className="fas fa-user-plus"></i> Sign Up</Nav.Link>
                            </LinkContainer>
                        </>
                    )
                }

                {
                    userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id='username'>
                            <LinkContainer to="/admin/userlist">
                                <NavDropdown.Item><i className="fas fa-users"></i> Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/productlist">
                                <NavDropdown.Item><i className="fas fa-list"></i> Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/orderlist">
                                <NavDropdown.Item><i className="fas fa-cart-shopping"></i> Orders</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )
                }

            </Nav>

              <SearchBox />
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header;