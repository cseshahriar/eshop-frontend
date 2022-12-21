import React from 'react';
import {Container, Row, Navbar, Nav} from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">EShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/cart"> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              <Nav.Link href="/login"><i className="fas fa-sign-in"></i> Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;