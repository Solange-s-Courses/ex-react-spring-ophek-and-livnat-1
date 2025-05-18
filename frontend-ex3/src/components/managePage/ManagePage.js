//
// import {useState} from 'react';
// import WordsList from './wordsList/WordsList';
// import WordForm from './addWordForm/WordForm';
// import AddWordButton from "./AddWordButton";
//
// /**
//  * @returns {JSX.Element} The full UI to manage all cities.
//  * @constructor
//  */
// function ManagePage() {
//
//     const [showForm, setShowForm] = useState(false);
//
//     return (
//         <div>
//             <h1>Manage</h1>
//
//             { showForm ? (
//                 < WordForm
//                     cities={cities}
//                     addCity={addCity}
//                     setShowForm={setShowForm}
//                 />
//             ) : (
//                 <>
//                     <AddWordButton
//                         onClick={() => setShowForm(true)}
//                     />
//                     <WordsList
//                         cities={cities}
//                         updateCity={updateCity}
//                         deleteCity={deleteCity}
//                         toggleFavorite={toggleFavorite}
//                     />
//                 </>
//             )}
//
//         </div>
//     );
// }
//
// export default ManagePage;