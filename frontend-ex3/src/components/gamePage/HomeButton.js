import { useNavigate } from 'react-router-dom';
import React from "react";

/**
 * HomeButton component renders a button that navigates the user to the home page ('/').
 *
 * @component
 * @param {Object} props
 * @param {string} [props.buttonText="Click Me"] - The text displayed inside the button.
 * @returns {JSX.Element} A button that navigates to the home page on click.
 * @constructor
 */
function HomeButton({buttonText = "Click Me"}){

    const navigate = useNavigate();

    return(
        <div className="mt-4 text-center">
            <button
                onClick={() => navigate('/')}
                className="btn btn-outline-secondary mt-2"
            >
                {buttonText}
            </button>
        </div>
    )
}
export default HomeButton;