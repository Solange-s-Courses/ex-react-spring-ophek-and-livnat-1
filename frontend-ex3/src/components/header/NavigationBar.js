
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../imgs/hangmamLogo.jpg';

/**
 * Renders the main navigation bar for the Weather App.
 * Features:
 * - Uses React Bootstrap for responsive layout
 * - Highlights the active page with bold styling via useLocation hook
 * - Displays app logo and navigation links to main sections
 *
 * @component
 * @returns {JSX.Element} The navigation bar with routing links and branding.
 * @constructor
 */
export default function NavigationBar() {

    // Get current location to determine active nav item
    const location = useLocation();

    return (
        <Navbar expand="lg" bg="white" className="py-3 border-bottom">
            <Container fluid className="px-4">
                <div className="d-flex align-items-center">
                    <img src={`${logo}`} alt="Logo" width="50" height="50" className="me-2" />
                    <h1 className="h5 text-dark mb-0">
                    </h1>
                </div>

                <Navbar.Toggle aria-controls="navbarCollapse" />
                <Navbar.Collapse id="navbarCollapse" className="ml-auto">
                    <Nav className="text-center ms-4">
                        <Nav.Item>
                            <Link to="/" className={`nav-link text-dark mx-2 ${location.pathname === '/' ? 'fw-bold' : ''}`}>
                                Home
                            </Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link to="/Leaderboard" className={`nav-link text-dark mx-2 ${location.pathname === '/Leaderboard' ? 'fw-bold' : ''}`}>
                                Leaderboard
                            </Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link to="/About" className={`nav-link text-dark mx-2 ${location.pathname === '/About' ? 'fw-bold' : ''}`}>
                                About
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}