import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Navigation() {

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#4682B4' }} variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" style={linkStyle}>Projects</Nav.Link>
          <Nav.Link as={Link} to="/tasks" style={linkStyle}>Task</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
