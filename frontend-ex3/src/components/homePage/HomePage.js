
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriesDropdown from './CategoriesDropdown'; // Update the path as needed
import useDataApi from '../../customHooks/useDataApi'; // Update path as needed

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

    const [{ data, isLoading, isError }, fetchWord] = useDataApi({}, null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear validation errors when user starts typing again
        if (validation[name] === false) {
            setValidation(prev => ({
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

            // Fetch the random word from the API
            fetchWord({
                url: `/wordEntry/getRandomWord?category=${encodeURIComponent(formData.category)}`,
                method: 'GET'
            });
        }
    };

    // Effect to handle navigation after data is fetched
    useEffect(() => {
        if (!isLoading && data && !isError && isSubmitting) {
            // Navigate to the game page with the word and player data
            navigate('/game', {
                state: {
                    wordEntry: data,
                    nickname: formData.nickname
                }
            });

            // Reset submission state
            setIsSubmitting(false);
        } else if (!isLoading && isError && isSubmitting) {
            // Handle error case
            setIsSubmitting(false);
            alert('Failed to fetch a word. Please try again.');
        }
    }, [data, isLoading, isError, navigate, formData, isSubmitting]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Hangman Game</h1>

            {/* Game Rules Section */}
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Game Rules</h2>
                <ul className="space-y-2">
                    <li>1. The computer will randomly select a word from your chosen category.</li>
                    <li>2. You need to guess the word by suggesting letters.</li>
                    <li>3. For each incorrect guess, a part of the hangman is drawn.</li>
                    <li>4. You have 6 incorrect guesses before the game ends.</li>
                    <li>5. If you guess the word before the hangman is complete, you win!</li>
                </ul>
            </div>

            {/* Player Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Player Setup</h2>
                <form onSubmit={handleSubmit}>
                    {/* Nickname Field */}
                    <div className="mb-4">
                        <label htmlFor="nickname" className="block mb-2 font-medium">Nickname:</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                                ${validation.nickname === false ? 'is-invalid' :
                                validation.nickname === true ? 'is-valid' : ''}`}
                            placeholder="Enter your nickname"
                            disabled={isSubmitting}
                        />
                        {validation.nickname === false && (
                            <div className="invalid-feedback">
                                Nickname cannot be empty
                            </div>
                        )}
                    </div>

                    {/* Categories Dropdown */}
                    <div className="mb-6">
                        <label htmlFor="category-select" className="block mb-2 font-medium">Category:</label>
                        <CategoriesDropdown
                            id="category-select"
                            handleChange={handleInputChange}
                            value={formData.category}
                            isValid={validation.category}
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Loading...' : 'Start Game'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default HomePage;