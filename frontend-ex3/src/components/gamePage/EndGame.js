
//import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton'

function EndGame({ data, word }) {

    const {score, nickname, rank, status } = {...data};

    return (
        <div className="text-center mb-4">
            <div className="alert alert-success p-4">
                <h3 className="fs-2 fw-bold mb-3">Good Job, {nickname}!</h3>
                <p className="fs-4 mb-3">The word was: <span className="fw-bold">{word}</span></p>

                {status ? (
                    <p className="fs-4 mb-3">Your best score is: <span className="fw-bold">{score}</span></p>
                ) : (
                    <p className="fs-4 mb-3">Your rank is now <span className="fw-bold">{rank}</span></p>
                )}
                <p className="fs-4 mb-3">Your rank is still <span className="fw-bold">{rank}</span></p>

                <HomeButton
                    buttonText = "Back To Home"
                    />

            </div>
        </div>
    );
}

export default EndGame;
