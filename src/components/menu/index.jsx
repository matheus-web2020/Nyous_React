import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Menu = () =>{
    return(
        <Navbar CollapseOnSelect bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">NYOUS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/cadastrar">cadastrar</Nav.Link>
              </Nav>
            </Navbar.Collapse>
      </Navbar>
    )
}

export default Menu;