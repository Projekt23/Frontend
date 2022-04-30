import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { FormControl } from 'react-bootstrap';
import App from './App';

export default function Navigation(){
    return(
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <img
          src="logo-lila.png"
          width="30"
          height="30"
          
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        <Navbar.Brand href="#home">Projekt23</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="features">Features</Nav.Link>
          <Nav.Link href="pricing">Pricing</Nav.Link>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
        </Nav>
        </Container>
      </Navbar>
    </>
    )
  }