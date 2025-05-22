
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriesDropdown from './CategoriesDropdown';
import useDataApi from '../../customHooks/useDataApi';

function HomePage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: '',
        category: ''
    });

    const [validation, setValidation] = useState({
        nickname: null,
        category: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refreshCategories, setRefreshCategories] = useState(false);

    const [{ data, isLoading, isError, error }, setApiConfig] = useDataApi({ url: '' }, null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        // Clear validation errors when user starts typing again
        if (validation[name] === false) {
            setValidation((prev) => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form before submission
        const nicknameValid = formData.nickname.trim() !== '';
        const categoryValid = !!formData.category;

        setValidation({
            nickname: nicknameValid,
            category: categoryValid
        });

        if (nicknameValid && categoryValid) {
            // Set submitting state to show loading indicator
            setIsSubmitting(true);

            setShowErrorModal(false);
            setErrorMessage('');

            // Fetch the random word from the API
            setApiConfig({
                url: `/wordEntry/getRandomWord?category=${encodeURIComponent(formData.category)}`,
                method: 'GET'
            });
        }
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false);
        setErrorMessage('');
        setIsSubmitting(false);

        // Reset the API state by setting an empty URL
        setApiConfig({ url: '' });

        // Clear the selected category when refreshing
        setFormData((prevState) => ({
            ...prevState,
            category: ''
        }));

        // Clear category validation state
        setValidation((prev) => ({
            ...prev,
            category: null
        }));

        // // Clear the selected category when refreshing
        // setFormData({
        //     ...formData,
        //     category: ''
        // });
        //
        // // Clear category validation state
        // setValidation({
        //     ...validation,
        //     category: null
        // });

        // Trigger categories refresh by toggling the boolean
        setRefreshCategories((prev) => !prev);
    };


    // Effect to handle navigation after data is fetched
    useEffect(() => {

        if(isSubmitting) {
            if (!isLoading && data && !isError) {
                // Navigate to the game page with the word and player data
                navigate('/game', {
                    state: {
                        wordEntry: data,
                        nickname: formData.nickname
                    }
                });

                // Reset submission state
                setIsSubmitting(false);
                // Clear the API state after successful navigation
                setApiConfig({ url: '' });
            } else if (!isLoading && isError && error) {
                // Handle error case
                setIsSubmitting(false);
                setErrorMessage(error);
                setShowErrorModal(true);
            }
        }
    }, [data, isLoading, isError, error, navigate, formData.nickname, isSubmitting]);

    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">
                {/* Header with title */}
                <div className="text-center mb-5">
                    <h1 className="display-2 fw-bold mb-3 text-dark">
                        HANGMAN
                    </h1>
                    <p className="fs-4 text-dark">Test your vocabulary and save the stick figure!</p>
                </div>

                <div className="row g-4">
                    {/* Game Rules Panel */}
                    <div className="col-md-6">
                        <div className="card h-100 bg-light border-0 shadow rounded-3">
                            <div className="card-body p-4">
                                <h2 className="card-title fs-2 mb-4 text-center">
                                    <span className="badge rounded-pill bg-danger p-2 me-2">?</span>
                                    How To Play
                                </h2>

                                <div className="mb-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 me-3">
                                            <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>1</span>
                                        </div>
                                        <div>
                                            <p className="mb-0">We'll randomly select a mystery word from your chosen category</p>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 me-3">
                                            <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>2</span>
                                        </div>
                                        <div>
                                            <p className="mb-0">Guess letters to uncover the word before the hangman is complete</p>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 me-3">
                                            <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>3</span>
                                        </div>
                                        <div>
                                            <p className="mb-0">Each wrong guess adds a body part to the hangman (6 mistakes allowed)</p>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>4</span>
                                        </div>
                                        <div>
                                            <p className="mb-0">Guess the word correctly to win and save the stick figure!</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-warning">
                                    <div className="d-flex">
                                        <div className="me-2">💡</div>
                                        <div>
                                            <strong>Pro Tip:</strong> Start with common vowels like A, E, I, O, U to reveal more letters!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Player Setup Form */}
                    <div className="col-md-6">
                        <div className="card h-100 bg-light border-0 shadow rounded-3">
                            <div className="card-body p-4">
                                <h2 className="card-title fs-2 mb-4 text-center">
                                    <span className="badge rounded-pill bg-success p-2 me-2">✓</span>
                                    Player Setup
                                </h2>

                                <form onSubmit={handleSubmit}>
                                    {/* Nickname Field */}
                                    <div className="mb-4">
                                        <label htmlFor="nickname" className="form-label">
                                            Your Nickname:
                                        </label>
                                        <input
                                            type="text"
                                            id="nickname"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleInputChange}
                                            className={`form-control text-center ${
                                                validation.nickname === false
                                                    ? 'is-invalid'
                                                    : validation.nickname === true
                                                        ? 'is-valid'
                                                        : ''
                                            }`}
                                            placeholder="Enter your nickname"
                                            disabled={isSubmitting}
                                        />
                                        {validation.nickname === false && (
                                            <div className="invalid-feedback">
                                                Please enter a nickname to continue
                                            </div>
                                        )}
                                    </div>

                                    {/* Categories Dropdown */}
                                    <div className="mb-4">
                                        <label htmlFor="category-select" className="form-label">
                                            Select a Category:
                                        </label>
                                        <CategoriesDropdown
                                            id="category-select"
                                            handleChange={handleInputChange}
                                            value={formData.category}
                                            isValid={validation.category}
                                            disabled={isSubmitting}
                                            refreshTrigger={refreshCategories}
                                            className={`form-select form-select-lg text-dark ${
                                                validation.category === false
                                                    ? 'is-invalid'
                                                    : validation.category === true
                                                        ? 'is-valid'
                                                        : ''
                                            }`}
                                        />
                                        {validation.category === false && (
                                            <div className="invalid-feedback">
                                                Please select a category
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg w-100 py-3 shadow"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </span>
                                        ) : (
                                            <span className="d-flex align-items-center justify-content-center">
                                                Start Game →
                                            </span>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-4 text-center">
                                    <p>Ready to test your vocabulary skills?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 text-center">
                    <p>© {new Date().getFullYear()} Hangman Game | Made with ❤️ for word lovers</p>
                </div>
            </div>


            {/* Error Modal */}
            <div className={`modal fade ${showErrorModal ? 'show' : ''}`}
                 style={{ display: showErrorModal ? 'block' : 'none' }}
                 tabIndex="-1"
                 aria-labelledby="errorModalLabel"
                 aria-hidden={!showErrorModal}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg">
                        <div className="modal-header bg-danger text-white border-0">
                            <h5 className="modal-title" id="errorModalLabel">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                Oops! Something went wrong
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={handleErrorModalClose}
                                aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="text-center mb-3">
                                <div className="display-1 text-danger mb-3">😵</div>
                                <p className="fs-5 mb-3">{errorMessage}</p>
                                <p className="text-muted">
                                    Don't worry! We'll refresh the categories for you and you can try again.
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer border-0 justify-content-center">
                            <button
                                type="button"
                                className="btn btn-success btn-lg px-4"
                                onClick={handleErrorModalClose}>
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Backdrop */}
            {showErrorModal && (
                <div className="modal-backdrop fade show" onClick={handleErrorModalClose}></div>
            )}

        </div>
    );
}

export default HomePage;

// return (
//     <div className="container mx-auto p-6">
//         <h1 className="text-4xl font-bold mb-6 text-center">Hangman Game</h1>
//
//         {/* Game Rules Section */}
//         <div className="bg-gray-100 p-6 rounded-lg mb-8">
//             <h2 className="text-2xl font-semibold mb-4">Game Rules</h2>
//             <ul className="space-y-2">
//                 <li>1. The computer will randomly select a word from your chosen category.</li>
//                 <li>2. You need to guess the word by suggesting letters.</li>
//                 <li>3. For each incorrect guess, a part of the hangman is drawn.</li>
//                 <li>4. You have 6 incorrect guesses before the game ends.</li>
//                 <li>5. If you guess the word before the hangman is complete, you win!</li>
//             </ul>
//         </div>
//
//         {/* Player Form */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Player Setup</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Nickname Field */}
//                 <div className="mb-4">
//                     <label htmlFor="nickname" className="block mb-2 font-medium">Nickname:</label>
//                     <input
//                         type="text"
//                         id="nickname"
//                         name="nickname"
//                         value={formData.nickname}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2
//                             ${validation.nickname === false ? 'is-invalid' :
//                             validation.nickname === true ? 'is-valid' : ''}`}
//                         placeholder="Enter your nickname"
//                         disabled={isSubmitting}
//                     />
//                     {validation.nickname === false && (
//                         <div className="invalid-feedback">
//                             Nickname cannot be empty
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Categories Dropdown */}
//                 <div className="mb-6">
//                     <label htmlFor="category-select" className="block mb-2 font-medium">Category:</label>
//                     <CategoriesDropdown
//                         id="category-select"
//                         handleChange={handleInputChange}
//                         value={formData.category}
//                         isValid={validation.category}
//                         disabled={isSubmitting}
//                     />
//                 </div>
//
//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                     disabled={isSubmitting}
//                 >
//                     {isSubmitting ? 'Loading...' : 'Start Game'}
//                 </button>
//             </form>
//         </div>
//     </div>
// );