// import CityRow from './wordRow';
// import CityEditForm from "../addWordform/WordEditForm";
// import DeleteConfirmationModal from './DeleteConfirmationModal';
// import {useState} from "react";
//
// /**
//  * WordsList component displays a list of words with edit, delete options.
//  * It supports inline editing and shows a confirmation modal before deletion.
//  *
//  * @param {Object} props
//  * @param {Array<Object>} props.cities - List of city objects to render.
//  * @param {function} props.updateCity - Callback to update a city's details.
//  * @param {function} props.deleteCity - Callback to delete a city.
//  * @param {function} props.toggleFavorite - Callback to toggle a city's favorite status.
//  * @returns {JSX.Element} A list of cities with actions.
//  * @constructor
//  */
// function WordsList({ cities, updateCity, deleteCity, toggleFavorite}) {
//
//     const [editingCity, setEditingCity] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [cityToDelete, setCityToDelete] = useState(null);
//
//     /**
//      * Opens the delete confirmation modal for a specific city.
//      *
//      * @param {string} cityName - Name of the city to delete.
//      */
//     const handleDeleteClick = (cityName) => {
//         setCityToDelete(cityName);
//         setShowDeleteModal(true);
//     };
//
//     /**
//      * Closes the delete confirmation modal and clears the selected city.
//      */
//     const handleCloseDeleteModal = () => {
//         setShowDeleteModal(false);
//         setCityToDelete(null);
//     };
//
//     /**
//      * Confirms deletion of the selected city.
//      */
//     const confirmDelete = () => {
//         deleteCity(cityToDelete);
//         setShowDeleteModal(false);
//         setCityToDelete(null);
//     };
//
//     /**
//      * Toggles the favorite status of a city.
//      *
//      * @param {string} cityName - Name of the city to toggle favorite.
//      */
//     const handleToggleFavorite = (cityName) => {
//         toggleFavorite(cityName);
//     };
//
//     /**
//      * Sets a city for editing.
//      *
//      * @param {Object} city - City object to be edited.
//      */
//     const handleEditCity = (city) => {
//         setEditingCity(city);
//     };
//
//     /**
//      * Handles the update of a city's information.
//      *
//      * @param {Object} updatedCity - Updated city data.
//      */
//     const handleUpdateCity = (updatedCity) => {
//         updateCity(editingCity.name, updatedCity);
//         setEditingCity(null);
//     };
//
//     /**
//      * Cancels the editing mode.
//      */
//     const handleCancelEdit = () => {
//         setEditingCity(null);
//     };
//
//     return (
//         <div className="mb-5">
//             {cities.length > 0 ? (
//                 <div className="list-group">
//                     {cities.map(city => (
//                         editingCity?.name === city.name ? (
//                             <CityEditForm
//                                 key={city.name}
//                                 city={city}
//                                 cities = {cities}
//                                 onSave={handleUpdateCity}
//                                 onCancel={handleCancelEdit}
//                             />
//                         ) : (
//                             <CityRow
//                                 key={city.name}
//                                 city={city}
//                                 onEdit={() => handleEditCity(city)}
//                                 onDelete={() => handleDeleteClick(city.name)}
//                                 onToggleFavorite={() => handleToggleFavorite(city.name)}
//                             />
//                         )
//                     ))}
//                 </div>
//             ) : (
//                 <div className="alert alert-info bg-light border-info d-flex align-items-center">
//                     <i className="bi bi-info-circle me-3 fs-4"></i>
//                     <p className="mb-0">
//                         No cities added yet, add your first city!
//                     </p>
//                 </div>
//             )}
//
//             <DeleteConfirmationModal
//                 show={showDeleteModal}
//                 cityName={cityToDelete}
//                 onClose={handleCloseDeleteModal}
//                 onConfirm={confirmDelete}
//             />
//
//         </div>
//     );
// }
//
// export default WordsList;