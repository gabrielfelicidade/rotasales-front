import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "../login/LogoutButton";

const WithNavLayout = (props) => {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand>RotaSales</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/sales">Vendas</Nav.Link>
                        <LogoutButton />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div style={{ width: '90vw', margin: 'auto', marginTop: '15px' }}>
                {props.children}
            </div>
        </>
    )
}

export default WithNavLayout;