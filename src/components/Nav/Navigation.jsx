import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Documentation Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/Documents">Documents</Nav.Link>
            <Nav.Link href="/Groups">Group Management</Nav.Link>
            <Nav.Link href="/Visualization">Visualization</Nav.Link>
            <NavDropdown title="Data" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Documents/PCA">PCA</NavDropdown.Item>
              <NavDropdown.Item href="/Documents/Network">
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