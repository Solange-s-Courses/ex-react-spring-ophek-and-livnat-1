import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GameExitModal from './GameExitModal';
import logo from '../../imgs/hangmamLogo.jpg';

/**
 * Renders the main navigation bar for the Hangman App.
 * Features:
 * - Uses React Bootstrap for responsive layout
 * - Highlights the active page with bold styling via useLocation hook
 * - Displays app logo and navigation links to main sections
 * - Shows confirmation modal when trying to leave game page
 *
 * @component
 * @returns {JSX.Element} The navigation bar with routing links and branding.
 * @constructor
 */
export default function NavigationBar() {

    // Get current location to determine active nav item
    const location = useLocation();
    const navigate = useNavigate();

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState('');

    // Check if currently on game page
    const isOnGamePage = location.pathname === '/game';

    const handleNavClick = (e, path) => {

        // If on game page and trying to go somewhere else, show modal
        if (isOnGamePage && path !== '/game') {
            e.preventDefault();
            setPendingNavigation(path);
            setShowModal(true);
        }
        // Otherwise, normal navigation (handled by Link)
    };

    const handleCancelNavigation = () => {
        setShowModal(false);
        setPendingNavigation('');
    };

    const handleConfirmNavigation = () => {
        setShowModal(false);
        navigate(pendingNavigation);
        setPendingNavigation('');
    };

    return (
        <>
            <Navbar expand="lg" bg="white" className="py-3 border-bottom">
                <Container fluid className="px-4">
                    <div className="d-flex align-items-center">
                        <img src={`${logo}`} alt="Logo" width="50" height="50" className="me-2" />
                    </div>

                    <Navbar.Toggle aria-controls="navbarCollapse" />
                    <Navbar.Collapse id="navbarCollapse" className="ml-auto">
                        <Nav className="text-center ms-4">
                            <Nav.Item>
                                <Link to="/"
                                      className={`nav-link text-dark mx-2 ${location.pathname === '/' ? 'fw-bold' : ''}`}
                                      onClick={(e) => handleNavClick(e, '/')}
                                >
                                    Home
                                </Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Link to="/ManagePage"
                                      className={`nav-link text-dark mx-2 ${location.pathname === '/ManagePage' ? 'fw-bold' : ''}`}
                                      onClick={(e) => handleNavClick(e, '/ManagePage')}
                                >
                                    Manage Words
                                </Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Link to="/Leaderboard"
                                      className={`nav-link text-dark mx-2 ${location.pathname === '/Leaderboard' ? 'fw-bold' : ''}`}
                                      onClick={(e) => handleNavClick(e, '/Leaderboard')}
                                >
                                    Leaderboard
                                </Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Link to="/About"
                                      className={`nav-link text-dark mx-2 ${location.pathname === '/About' ? 'fw-bold' : ''}`}
                                      onClick={(e) => handleNavClick(e, '/About')}
                                >
                                    About
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Game Exit Confirmation Modal */}
            <GameExitModal
                show={showModal}
                onCancel={handleCancelNavigation}
                onConfirm={handleConfirmNavigation}
            />
        </>
    );
}