import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './ErrorModal';
import useDataApi from "../../customHooks/useDataApi";
import GameRules from "./GameRules";
import PlayerSetupForm from "./PlayerSetupForm"

/**
 * HomePage - Main entry page for the Hangman game.
 * Handles nickname/category input, validation, and navigation to the game screen.
 *
 * @returns {Element}
 * @constructor
 */
function HomePage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({nickname: '', category: ''});
    const [validation, setValidation] = useState({nickname: null, category: null});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [{ data, isLoading, isError, error }, setConfig, reset] = useDataApi({ url: '' }, null);

    /**
     * Handle user input changes.
     * @param e
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}));

        if (validation[name] === false) {
            setValidation((prev) => ({...prev, [name]: null}));
        }
    };

    /**
     * Close the error modal and reset relevant state.
     */
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setErrorMessage('');
        reset();
    };

    /**
     * Handle form submission and trigger the API call.
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nicknameValid = formData.nickname.trim() !== '';
        const categoryValid = !!formData.category;

        setValidation({
            nickname: nicknameValid ,
            category: categoryValid
        });

        if (nicknameValid && categoryValid) {
            setIsSubmitting(true);

            // Reset any previous data/errors before making new request
            // This prevents stale error states from interfering
            reset();

            // Use setConfig to trigger the API call
            setConfig({
                url: `/wordEntry/getRandomWord?category=${encodeURIComponent(formData.category)}`,
                method: 'GET',
                data: null,
                headers: {}
            });
        }
    };

    /**
     * Process the API response after submission.
     */
    useEffect(() => {

        // Only process responses when we're actively submitting
        if (!isSubmitting) return;

        if (!isLoading && data) {

            setIsSubmitting(false);
            navigate('/game', {
                state: {
                    wordEntry: data,
                    nickname: formData.nickname
                }
            });

        } else if (!isLoading && isError && error) {
            setErrorMessage(error);
            setShowDeleteModal(true);

            // Clean up after error
            setIsSubmitting(false);
            setFormData((prevState) => ({...prevState, category: ''}));
            setValidation((prev) => ({...prev, category: null}));
            setRefreshTrigger((prev) => !prev);
        }
    }, [data, isLoading, isError, error, isSubmitting, navigate, formData.nickname]);


    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-2 fw-bold mb-3 text-dark">HANGMAN</h1>
                    <p className="fs-4 text-dark">Test your vocabulary skills!</p>
                </div>

                <div className="row g-4">
                    <GameRules/>
                    <PlayerSetupForm
                        handleSubmit = {handleSubmit}
                        handleInputChange = {handleInputChange}
                        isSubmitting = {isSubmitting}
                        validation = {validation}
                        formData = {formData}
                        refreshTrigger = {refreshTrigger}
                    />
                </div>

                <div className="mt-5 text-center">
                    <p>© {new Date().getFullYear()} Hangman Game | Made with ❤️ for word lovers</p>
                </div>
            </div>

            {showDeleteModal && (
                <ErrorModal
                    show={showDeleteModal}
                    onClose={handleCloseDeleteModal}
                    message={errorMessage}
                />
            )}

        </div>
    );
}

export default HomePage;


//--------------------------------------------
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import CategoriesDropdown from './CategoriesDropdown';
// import ErrorModal from './ErrorModal';
//
// function HomePage() {
//     const navigate = useNavigate();
//
//     const [formData, setFormData] = useState({nickname: '', category: ''});
//     const [validation, setValidation] = useState({nickname: null, category: null});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [refreshTrigger, setRefreshTrigger] = useState(false);
//
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({...prev, [name]: value}));
//
//         if (validation[name] === false) {
//             setValidation((prev) => ({...prev, [name]: null}));
//         }
//     };
//
//     const handleCloseDeleteModal = () => {
//         setShowDeleteModal(false);
//         setErrorMessage('');
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         const nicknameValid = formData.nickname.trim() !== '';
//         const categoryValid = !!formData.category;
//
//         setValidation({
//             nickname: nicknameValid ,
//             category: categoryValid
//         });
//
//         if (nicknameValid && categoryValid) {
//             setIsSubmitting(true);
//
//             try {
//                 const response = await axios.get(
//                     `/wordEntry/getRandomWord?category=${encodeURIComponent(formData.category)}`
//                 );
//
//                 // Success - navigate to game
//                 navigate('/game', {
//                     state: {
//                         wordEntry: response.data,
//                         nickname: formData.nickname
//                     }
//                 });
//             } catch (error) {
//                 // Error - show modal instead of alert
//                 const errorMsg = error.response?.data || error.message;
//                 setErrorMessage(errorMsg);
//                 setShowDeleteModal(true);
//             } finally {
//                 setIsSubmitting(false);
//                 // Clear the selected category when refreshing
//                 setFormData((prevState) => ({...prevState, category: ''}));
//                 // Clear category validation state
//                 setValidation((prev) => ({...prev, category: null}));
//                 setRefreshTrigger((prev) => !prev);
//             }
//         }
//     };
//
//     return (
//         <div className="min-vh-100 py-5 bg-info bg-opacity-25">
//             <div className="container">
//                 {/* Header with title */}
//                 <div className="text-center mb-5">
//                     <h1 className="display-2 fw-bold mb-3 text-dark">
//                         HANGMAN
//                     </h1>
//                     <p className="fs-4 text-dark">Test your vocabulary and save the stick figure!</p>
//                 </div>
//
//                 <div className="row g-4">
//                     {/* Game Rules Panel */}
//                     <div className="col-md-6">
//                         <div className="card h-100 bg-light border-0 shadow rounded-3">
//                             <div className="card-body p-4">
//                                 <h2 className="card-title fs-2 mb-4 text-center">
//                                     <span className="badge rounded-pill bg-danger p-2 me-2">?</span>
//                                     How To Play
//                                 </h2>
//
//                                 <div className="mb-4">
//                                     <div className="d-flex align-items-center mb-3">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>1</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">We'll randomly select a mystery word from your chosen category</p>
//                                         </div>
//                                     </div>
//
//                                     <div className="d-flex align-items-center mb-3">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>2</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">Guess letters to uncover the word before the hangman is complete</p>
//                                         </div>
//                                     </div>
//
//                                     <div className="d-flex align-items-center mb-3">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>3</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">Each wrong guess adds a body part to the hangman (6 mistakes allowed)</p>
//                                         </div>
//                                     </div>
//
//                                     <div className="d-flex align-items-center">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>4</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">Guess the word correctly to win and save the stick figure!</p>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 <div className="alert alert-warning">
//                                     <div className="d-flex">
//                                         <div className="me-2">💡</div>
//                                         <div>
//                                             <strong>Pro Tip:</strong> Start with common vowels like A, E, I, O, U to reveal more letters!
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Player Setup Form */}
//                     <div className="col-md-6">
//                         <div className="card h-100 bg-light border-0 shadow rounded-3">
//                             <div className="card-body p-4">
//                                 <h2 className="card-title fs-2 mb-4 text-center">
//                                     <span className="badge rounded-pill bg-success p-2 me-2">✓</span>
//                                     Player Setup
//                                 </h2>
//
//                                 <form onSubmit={handleSubmit}>
//                                     {/* Nickname Field */}
//                                     <div className="mb-4">
//                                         <label htmlFor="nickname" className="form-label">
//                                             Your Nickname:
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id="nickname"
//                                             name="nickname"
//                                             value={formData.nickname}
//                                             onChange={handleInputChange}
//                                             className={`form-control text-center ${
//                                                 validation.nickname === false
//                                                     ? 'is-invalid'
//                                                     : validation.nickname === true
//                                                         ? 'is-valid'
//                                                         : ''
//                                             }`}
//                                             placeholder="Enter your nickname"
//                                             disabled={isSubmitting}
//                                         />
//                                         {validation.nickname === false && (
//                                             <div className="invalid-feedback">
//                                                 Please enter a nickname to continue
//                                             </div>
//                                         )}
//                                     </div>
//
//                                     {/* Categories Dropdown */}
//                                     <div className="mb-4">
//                                         <label htmlFor="category-select" className="form-label">
//                                             Select a Category:
//                                         </label>
//                                         <CategoriesDropdown
//                                             id="category-select"
//                                             handleChange={handleInputChange}
//                                             value={formData.category}
//                                             isValid={validation.category}
//                                             disabled={isSubmitting}
//                                             refreshTrigger={refreshTrigger}
//                                             className={`form-select form-select-lg text-dark ${
//                                                 validation.category === false
//                                                     ? 'is-invalid'
//                                                     : validation.category === true
//                                                         ? 'is-valid'
//                                                         : ''
//                                             }`}
//                                         />
//                                         {validation.category === false && (
//                                             <div className="invalid-feedback">
//                                                 Please select a category
//                                             </div>
//                                         )}
//                                     </div>
//
//                                     {/* Submit Button */}
//                                     <button
//                                         type="submit"
//                                         className="btn btn-success btn-lg w-100 py-3 shadow"
//                                         disabled={isSubmitting}
//                                     >
//                                         {isSubmitting ? (
//                                             <span>
//                                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                 Loading...
//                                             </span>
//                                         ) : (
//                                             <span className="d-flex align-items-center justify-content-center">
//                                                 Start Game →
//                                             </span>
//                                         )}
//                                     </button>
//                                 </form>
//
//                                 <div className="mt-4 text-center">
//                                     <p>Ready to test your vocabulary skills?</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="mt-5 text-center">
//                     <p>© {new Date().getFullYear()} Hangman Game | Made with ❤️ for word lovers</p>
//                 </div>
//             </div>
//
//             {showDeleteModal && (
//                 <ErrorModal
//                     show={showDeleteModal}
//                     onClose={handleCloseDeleteModal}
//                     message={errorMessage}
//                 />
//             )}
//
//         </div>
//     );
// }
//
// export default HomePage;

//--------------------------------------------



// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CategoriesDropdown from './CategoriesDropdown';
// import useDataApi from '../../customHooks/useDataApi';
//
// function HomePage() {
//     const navigate = useNavigate();
//
//     const [formData, setFormData] = useState({nickname: '', category: ''});
//     const [validation, setValidation] = useState({nickname: null, category: null});
//
//     const [isSubmitting, setIsSubmitting] = useState(false);
//
//
//     const [{ data, isLoading, isError, error }, fetchWord] = useDataApi({ url: '' }, null);
//
//     const handleInputChange = (e) => {
//
//         const { name, value } = e.target;
//         setFormData((prev) => ({...prev, [name]: value}));
//
//         // Clear validation errors when user starts typing again
//         if (validation[name] === false) {
//             setValidation((prev) => ({...prev, [name]: null}));
//         }
//
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         // Validate form before submission
//         const nicknameValid = formData.nickname.trim() !== '';
//         const categoryValid = !!formData.category;
//
//         setValidation({
//             nickname: nicknameValid? nicknameValid:null,
//             category: categoryValid? categoryValid:null });
//
//         if (nicknameValid && categoryValid) {
//             // Set submitting state to show loading indicator
//             setIsSubmitting(true);
//
//             fetchWord({
//                 url: `/wordEntry/getRandomWord?category=${encodeURIComponent(formData.category)}`,
//                 method: 'GET'
//             });
//         }
//     };
//
//
//     // Effect to handle navigation after data is fetched
//     useEffect(() => {
//
//         console.log('=== useEffect triggered ===');
//         console.log('States:', {
//             isSubmitting,
//             isLoading,
//             isError,
//             hasData: !!data,
//             error: error?.substring?.(0, 50) + '...' || error
//         });
//
//         if(isSubmitting){
//             // Success case - prioritize data presence over error state
//             if (!isLoading && data) {
//                 console.log('SUCCESS: Have data, navigating regardless of error state');
//
//                 navigate('/game', {
//                     state: {
//                         wordEntry: data,
//                         nickname: formData.nickname
//                     }
//                 });
//
//                 setIsSubmitting(false);
//             }
//             // Only show error if we have no data AND there's an error
//             else if (!isLoading && !data && isError && error) {
//                 alert(error);
//                 console.log('ERROR: No data and error present');
//                 setIsSubmitting(false);
//             }
//         }
//     }, [data, isLoading, navigate, isSubmitting]);
//
//     return (
//         <div className="min-vh-100 py-5 bg-info bg-opacity-25">
//             <div className="container">
//                 {/* Header with title */}
//                 <div className="text-center mb-5">
//                     <h1 className="display-2 fw-bold mb-3 text-dark">
//                         HANGMAN
//                     </h1>
//                     <p className="fs-4 text-dark">Test your vocabulary and save the stick figure!</p>
//                 </div>
//
//                 <div className="row g-4">
//                     {/* Game Rules Panel */}
//                     <div className="col-md-6">
//                         <div className="card h-100 bg-light border-0 shadow rounded-3">
//                             <div className="card-body p-4">
//                                 <h2 className="card-title fs-2 mb-4 text-center">
//                                     <span className="badge rounded-pill bg-danger p-2 me-2">?</span>
//                                     How To Play
//                                 </h2>
//
//                                 <div className="mb-4">
//                                     <div className="d-flex align-items-center mb-3">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>1</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">We'll randomly select a mystery word from your chosen category</p>
//                                         </div>
//                                     </div>
//
//                                     <div className="d-flex align-items-center mb-3">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>2</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">Guess letters to uncover the word before the hangman is complete</p>
//                                         </div>
//                                     </div>
//
//                                     <div className="d-flex align-items-center mb-3">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>3</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">Each wrong guess adds a body part to the hangman (6 mistakes allowed)</p>
//                                         </div>
//                                     </div>
//
//                                     <div className="d-flex align-items-center">
//                                         <div className="flex-shrink-0 me-3">
//                                             <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px"}}>4</span>
//                                         </div>
//                                         <div>
//                                             <p className="mb-0">Guess the word correctly to win and save the stick figure!</p>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 <div className="alert alert-warning">
//                                     <div className="d-flex">
//                                         <div className="me-2">💡</div>
//                                         <div>
//                                             <strong>Pro Tip:</strong> Start with common vowels like A, E, I, O, U to reveal more letters!
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Player Setup Form */}
//                     <div className="col-md-6">
//                         <div className="card h-100 bg-light border-0 shadow rounded-3">
//                             <div className="card-body p-4">
//                                 <h2 className="card-title fs-2 mb-4 text-center">
//                                     <span className="badge rounded-pill bg-success p-2 me-2">✓</span>
//                                     Player Setup
//                                 </h2>
//
//                                 <form onSubmit={handleSubmit}>
//                                     {/* Nickname Field */}
//                                     <div className="mb-4">
//                                         <label htmlFor="nickname" className="form-label">
//                                             Your Nickname:
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id="nickname"
//                                             name="nickname"
//                                             value={formData.nickname}
//                                             onChange={handleInputChange}
//                                             className={`form-control text-center ${
//                                                 validation.nickname === false
//                                                     ? 'is-invalid'
//                                                     : validation.nickname === true
//                                                         ? 'is-valid'
//                                                         : ''
//                                             }`}
//                                             placeholder="Enter your nickname"
//                                             disabled={isSubmitting}
//                                         />
//                                         {validation.nickname === false && (
//                                             <div className="invalid-feedback">
//                                                 Please enter a nickname to continue
//                                             </div>
//                                         )}
//                                     </div>
//
//                                     {/* Categories Dropdown */}
//                                     <div className="mb-4">
//                                         <label htmlFor="category-select" className="form-label">
//                                             Select a Category:
//                                         </label>
//                                         <CategoriesDropdown
//                                             id="category-select"
//                                             handleChange={handleInputChange}
//                                             value={formData.category}
//                                             isValid={validation.category}
//                                             disabled={isSubmitting}
//                                             className={`form-select form-select-lg text-dark ${
//                                                 validation.category === false
//                                                     ? 'is-invalid'
//                                                     : validation.category === true
//                                                         ? 'is-valid'
//                                                         : ''
//                                             }`}
//                                         />
//                                         {validation.category === false && (
//                                             <div className="invalid-feedback">
//                                                 Please select a category
//                                             </div>
//                                         )}
//                                     </div>
//
//                                     {/* Submit Button */}
//                                     <button
//                                         type="submit"
//                                         className="btn btn-success btn-lg w-100 py-3 shadow"
//                                         disabled={isSubmitting}
//                                     >
//                                         {isSubmitting ? (
//                                             <span>
//                                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                 Loading...
//                                             </span>
//                                         ) : (
//                                             <span className="d-flex align-items-center justify-content-center">
//                                                 Start Game →
//                                             </span>
//                                         )}
//                                     </button>
//                                 </form>
//
//                                 <div className="mt-4 text-center">
//                                     <p>Ready to test your vocabulary skills?</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="mt-5 text-center">
//                     <p>© {new Date().getFullYear()} Hangman Game | Made with ❤️ for word lovers</p>
//                 </div>
//             </div>
//
//         </div>
//     );
// }
//
// export default HomePage;
