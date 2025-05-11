
import { Outlet } from "react-router";
import NavigationBar from './NavigationBar';
import { Container } from 'react-bootstrap';

/**
 * The main layout header component for the application.
 * It includes the navigation bar and renders nested route content.
 *
 * This component uses React Router's `<Outlet />` to display child routes
 * and Bootstrap's `<Container />` for layout styling.
 *
 * @component
 * @returns {JSX.Element} The header layout including the navigation bar and routed content.
 * @constructor
 */
export default function Header() {
    return (
        <>
            {/* Combined NavBar with Title */}
            <NavigationBar/>

            {/* Content Area */}
            <Container fluid className="mt-4 px-5">
                <Outlet/>
            </Container>
        </>
    );
}