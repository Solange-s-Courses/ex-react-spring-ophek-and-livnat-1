import { useNavigate } from 'react-router-dom';
import React from "react";

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