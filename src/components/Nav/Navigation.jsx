import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState } from 'react';
import Directory from '../Directory';
import Groups from '../Groups';
import Visualization from '../Visualization';
import Network from '../Network';
function Navigation({ content, setContent }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Documentation Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setContent(<Directory />)}>Documents</Nav.Link>
            <Nav.Link onClick={() => setContent(<Groups />)}>Group Management</Nav.Link>
            <Nav.Link onClick={() => setContent(<Network />)}>Network</Nav.Link>
            <NavDropdown title="Data" id="basic-nav-dropdown">
              <NavDropdown.Item href="#PCA">PCA</NavDropdown.Item>
              <NavDropdown.Item href="#Network">
                Network of the Documents
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Export Data</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation;
/*
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Documentation Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/?tab=Documents">
              Documents
            </Nav.Link>
            <Nav.Link as={Link} to="/?tab=Groups">
              Group Management
            </Nav.Link>
            <Nav.Link as={Link} to="/?tab=Visualization">
              Visualization
            </Nav.Link>
            <NavDropdown title="Data" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/?tab=PCA">
                PCA
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?tab=Network">
                Network of the Documents
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/?tab=ExportData">
                Export Data
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
*/