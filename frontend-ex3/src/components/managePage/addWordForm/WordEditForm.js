//
// import CityFormComponent from './CityFormComponent';
//
// /**
//  * CityEditForm is a wrapper component that renders CityFormComponent
//  * in edit mode, pre-filled with the city to be edited.
//  *
//  * @param {Object} props
//  * @param {Object} props.city - The city object to edit.
//  * @param {Array<Object>} props.cities - List of all cities (used for validation).
//  * @param {Function} props.onSave - Callback to handle saving the edited city.
//  * @param {Function} props.onCancel - Callback to cancel the edit operation.
//  * @returns {JSX.Element} A form component configured for editing a city.
//  * @constructor
//  */
// function CityEditForm({ city, cities, onSave, onCancel }) {
//     return (
//         <CityFormComponent
//             initialCity={city}
//             cities={cities}
//             onSave={onSave}
//             onCancel={onCancel}
//             isEditing={true}
//         />
//     );
// }
//
// export default CityEditForm;