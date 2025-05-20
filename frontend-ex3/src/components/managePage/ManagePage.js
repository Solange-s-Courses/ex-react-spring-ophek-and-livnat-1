
import {useState, useEffect} from 'react';
import WordsList from './wordsList/WordsList';
import WordForm from './addWordForm/WordForm';
import AddWordButton from "./AddWordButton";
import useDataApi from '../../customHooks/useDataApi';
/**
 * ManagePage component for managing words in the Hangman game
 * @returns {JSX.Element} The full UI to manage all words
 * @constructor
 */
function ManagePage() {

    const [showForm, setShowForm] = useState(false);

    // API data fetching
    const [{ data: words, isLoading, isError }, fetchWords] = useDataApi(
        { url: '/wordEntry' },
        []
    );

    // API operations
    const [addWordState, doAddWord] = useDataApi();
    const [updateWordState, doUpdateWord] = useDataApi();
    const [deleteWordState, doDeleteWord] = useDataApi();

// Monitor CRUD operation states to refresh the main list when they complete
    useEffect(() => {
        if (!addWordState.isLoading) {
            // Always fetch words when the operation completes (success or failure)
            fetchWords({ url: '/wordEntry' });

            // Only close the form on success
            if (addWordState.data && !addWordState.isError) {
                setShowForm(false);
            }
        }
    }, [addWordState]);

    useEffect(() => {
        if (!updateWordState.isLoading) {
            // Always fetch words when the operation completes (success or failure)
            fetchWords({ url: '/wordEntry' });
        }
    }, [updateWordState]);

    useEffect(() => {
        if (!deleteWordState.isLoading) {
            // Always fetch words when the operation completes (success or failure)
            fetchWords({ url: '/wordEntry' });
        }
    }, [deleteWordState]);

    /**
     * Adds a new word
     * @param {Object} word - The word to add
     */
    const addWord = async (word) => {
        doAddWord({
            url: '/wordEntry/add',
            method: 'POST',
            data: word
        });
    };

    /**
     * Updates an existing word
     * @param {Object} updatedWord - The updated word data
     */
    const updateWord = async (updatedWord) => {
        doUpdateWord({
            url: `/wordEntry/update/${updatedWord.id}`,
            method: 'PUT',
            data: updatedWord
        });
    };

    /**
     * Deletes a word
     * @param {string} wordId - The ID of the word to delete
     */
    const deleteWord = async (wordId) => {
        doDeleteWord({
            url: `/wordEntry/delete/${wordId}`,
            method: 'DELETE'
        });
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
                            isLoading={addWordState.isLoading}
                            isError={addWordState.isError}
                            errorMessage={addWordState.error}
                        />
                    ) : (
                        <>
                            <AddWordButton
                                onClick={() => setShowForm(true)}
                            />
                            <WordsList
                                words={words|| []}
                                updateWord={updateWord}
                                deleteWord={deleteWord}
                                isUpdating={updateWordState.isLoading}
                                isDeleting={deleteWordState.isLoading}
                                isUpdateError={updateWordState.isError}
                                isDeleteError={deleteWordState.isError}
                                updateErrorMessage = {updateWordState.error}
                                deleteErrorMessage = {deleteWordState.error}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default ManagePage;