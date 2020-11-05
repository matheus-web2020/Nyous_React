import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';

const Menu = () =>{

  const history = useHistory();

  const sair = (event) =>{
    event.preventDefault();

    localStorage.removeItem('token-nyous-tarde');

    history.push('/')
  }

  const renderMenu = () => {

    const token = localStorage.getItem('token-nyous-tarde');

    if(token === null){
        <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/cadastrar">cadastrar</Nav.Link>
        </Nav>
    }
    else if( jwt_decode(token).role === 'Admin' ){
         return(
      <Nav>
          <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/admin/eventos">Eventos</Nav.Link>
          <Nav.Link href="/admin/categorias">Categorias</Nav.Link>
          <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
          <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
          <NavDropdown.Divider/>
          <NavDropdown.Item onClick ={event => sair(event)}>Sair</NavDropdown.Item>
          </NavDropdown>
      </Nav>
         )
      } else{
        return(
          <Nav>
                <Nav.Link href="/eventos">Eventos</Nav.Link>
                <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick ={event => sair(event)}>Sair</NavDropdown.Item>
                </NavDropdown>
          </Nav>
        )
      }
   }



    return(
        <Navbar CollapseOnSelect bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">NYOUS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/cadastrar">cadastrar</Nav.Link>
                </Nav>
              </Nav>
              
              {renderMenu()}
            </Navbar.Collapse>
      </Navbar>
    )
}

export default Menu;