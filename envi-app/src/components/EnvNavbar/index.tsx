import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { LinkContainer } from 'react-router-bootstrap'
// import { Link } from 'react-router-dom'

function EnvNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/"><Navbar.Brand>React-Bootstrap</Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                <LinkContainer to="/User"><Nav.Link>User</Nav.Link></LinkContainer>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <LinkContainer to="/search"><Button variant="outline-success">Search</Button></LinkContainer>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default EnvNavbar
