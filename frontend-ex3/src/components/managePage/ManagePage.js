
import {useState, useEffect, useReducer} from 'react';
import WordsList from './wordsList/WordsList';
import WordForm from './addWordForm/WordForm';
import AddWordButton from "./AddWordButton";
import useDataApi from '../../customHooks/useDataApi';
import wordsReducer, { ACTION_TYPES } from '../../customHooks/WordsReducer';

/**
 * ManagePage component for managing words in the Hangman game
 * @returns {JSX.Element} The full UI to manage all words
 * @constructor
 */
function ManagePage() {

    const [showForm, setShowForm] = useState(false);

    // Setup words reducer
    const [words, dispatch] = useReducer(wordsReducer, []);

    // API data fetching
    const [{ data, isLoading, isError }, fetchWords] = useDataApi(
        { url: '/wordEntry' },
        []
    );

    // API operations
    const [addWordApi, doAddWord] = useDataApi();
    const [updateWordApi, doUpdateWord] = useDataApi();
    const [deleteWordApi, doDeleteWord] = useDataApi();

    // Initialize words from API
    useEffect(() => {
        if (data && !isLoading && !isError) {
            dispatch({ type: ACTION_TYPES.INIT_WORDS, payload: data });
        }
    }, [data, isLoading, isError]);

    /**
     * Adds a new word
     * @param {Object} word - The word to add
     */
    const addWord = async (word) => {
        try {
            doAddWord({
                url: '/wordEntry/add',
                method: 'POST',
                data: word
            });

            // If the API call is successful, add to local state
            if (!addWordApi.isError && addWordApi.data) {
                dispatch({
                    type: ACTION_TYPES.ADD_WORD,
                    payload: addWordApi.data
                });
                setShowForm(false);
            }
        } catch (error) {
            console.error("Failed to add word:", error);
        }
    };

    /**
     * Updates an existing word
     * @param {Object} updatedWord - The updated word data
     */
    const updateWord = async (updatedWord) => {
        try {
            doUpdateWord({
                url: `/wordEntry/update/${updatedWord.id}`,
                method: 'PUT',
                data: updatedWord
            });

            // If the API call is successful, update local state
            if (!updateWordApi.isError) {
                dispatch({
                    type: ACTION_TYPES.UPDATE_WORD,
                    payload: updatedWord
                });
            }
        } catch (error) {
            console.error("Failed to update word:", error);
        }
    };

    /**
     * Deletes a word
     * @param {string} wordId - The ID of the word to delete
     */
    const deleteWord = async (wordId) => {
        try {
            doDeleteWord({
                url: `/wordEntry/delete/${wordId}`,
                method: 'DELETE'
            });

            // If the API call is successful, remove from local state
            if (!deleteWordApi.isError) {
                dispatch({
                    type: ACTION_TYPES.DELETE_WORD,
                    payload: wordId
                });
            }
        } catch (error) {
            console.error("Failed to delete word:", error);
        }
    };


    return (
        <div>
            <h1>Manage Words</h1>

            {isLoading ? (
                <p>Loading words...</p>
            ) : isError ? (
                <div>
                    <p>Error loading words. Please try again.</p>
                    <button onClick={() => fetchWords({ url: '/wordEntry' })}>Retry</button>
                </div>
            ) : (
                <>
                    { showForm ? (
                        < WordForm
                            addWord={addWord}
                            setShowForm={setShowForm}
                        />
                    ) : (
                        <>
                            <AddWordButton
                                onClick={() => setShowForm(true)}
                            />
                            <WordsList
                                words={words}
                                updateWord={updateWord}
                                deleteWord={deleteWord}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default ManagePage;