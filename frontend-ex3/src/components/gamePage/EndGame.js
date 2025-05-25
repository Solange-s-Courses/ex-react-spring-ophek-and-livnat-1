
//import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton'

function EndGame({ score, nickname, word }) {

    //const navigate = useNavigate();

    return (
        <div className="text-center mb-4">
            <div className="alert alert-success p-4">
                <h3 className="fs-2 fw-bold mb-3">Congratulations, {nickname}!</h3>
                <p className="fs-4 mb-3">The word was: <span className="fw-bold">{word}</span></p>
                <p className="fs-4 mb-3">Your score is: <span className="fw-bold">{score}</span></p>
                {/*<button*/}
                {/*    onClick={() => navigate('/')}*/}
                {/*    className="btn btn-primary btn-lg mt-2 px-4"*/}
                {/*>*/}
                {/*    CHANGE*/}
                {/*</button>*/}
                <HomeButton
                    buttonText = "Back To Home"
                    />

            </div>
        </div>
    );
}

export default EndGame;
