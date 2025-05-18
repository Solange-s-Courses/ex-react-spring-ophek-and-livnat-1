// import { useState, useEffect } from 'react';
// //import CountriesDropdown from "./CountriesDropdown";
// import { validateCityName, validateCountry, validateLatitude, validateLongitude } from '../../../utils/ValidateForm';
//
//
// /**
//  * CityFormComponent is a reusable form component for creating or editing a city.
//  *
//  * @param {Object} props
//  * @param {Object} [props.initialCity={}] - The initial city data for editing.
//  * @param {Array<Object>} [props.cities=[]] - The list of all existing cities (used for validation).
//  * @param {Function} props.onSave - Callback to save the form data.
//  * @param {Function} props.onCancel - Callback to cancel the form.
//  * @param {boolean} [props.isEditing=false] - Indicates whether the form is in edit mode.
//  * @returns {JSX.Element} The form component for adding or editing a city.
//  * @constructor
//  */
// function CityFormComponent({ initialCity = {}, cities = [], onSave, onCancel, isEditing = false}) {
//
//     const [formData, setFormData] = useState({...initialCity});
//     const [formValidity, setFormValidity] = useState({});
//
//     /**
//      * Validators for each field in the form.
//      * @type {{country: ((function(*): boolean)|*), latitude: ((function(*): *)|*), name: (function(*): boolean|*), longitude: ((function(*): *)|*)}}
//      */
//     const validators = {
//         name: value => validateCityName(value, cities, isEditing ? initialCity.name : null),
//         country: validateCountry,
//         latitude: validateLatitude,
//         longitude: validateLongitude,
//     };
//
//     // Initialize validation state when the form is mounted
//     useEffect(() => {
//         if (isEditing) {
//             const initialValidity = {};
//             for (const field in validators) {
//                 initialValidity[field] = validators[field](formData[field] || "");
//             }
//             setFormValidity(initialValidity);
//         }
//     }, []);
//
//     /**
//      * Handles changes in input fields and triggers validation.
//      *
//      * @param e
//      */
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const trimmedValue = value.trimStart();
//         setFormData(values => ({ ...values, [name]: trimmedValue }));
//         handleValidate(name, trimmedValue);
//     };
//
//     /**
//      * Validates a specific form field and updates its validity state.
//      *
//      * @param {string} name - Field name.
//      * @param {string} value - Field value.
//      */
//     const handleValidate = (name, value) => {
//         const isValid = validators[name]?.(value);
//         setFormValidity(errors => ({ ...errors, [name]: isValid }));
//     };
//
//     /**
//      * Handles form submission: validates all fields and invokes `onSave` if valid.
//      *
//      * @param e
//      */
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         let allValid = true;
//         const newValidity = {};
//
//         for (const field in validators) {
//             const value = formData[field] || "";
//             const isValid = validators[field](value);
//             newValidity[field] = isValid;
//             if (!isValid) allValid = false;
//         }
//
//         setFormValidity(newValidity);
//
//         if (!allValid) return; // prevent submission
//
//         onSave(formData);
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className={isEditing ? "list-group-item" : ""}>
//             <div className="mb-3">
//                 <label htmlFor="name" className="form-label">City Name</label>
//                 <input
//                     type="text"
//                     className={`form-control ${
//                         formValidity.name === false ? 'is-invalid' :
//                             formValidity.name === true ? 'is-valid' : ''
//                     }`}
//                     id="name"
//                     name="name"
//                     value={formData.name || ""}
//                     onChange={handleChange}
//                     autoComplete="address-level2"
//                 />
//                 {formValidity.name === false && (
//                     <div className="invalid-feedback">
//                         Name must be unique and contain only letters
//                     </div>
//                 )}
//             </div>
//
//             <div className="mb-2">
//                 <label htmlFor="country" className="form-label">Country</label>
//                 <CountriesDropdown
//                     handleChange={handleChange}
//                     value={formData.country}
//                     isValid={formValidity.country}
//                     id="country"
//                     autoComplete="country"
//                 />
//             </div>
//
//             <div className="row mb-2">
//                 <div className="col">
//                     <label htmlFor="latitude" className="form-label">Latitude</label>
//                     <input
//                         type="number"
//                         step="0.000001"
//                         className={`form-control ${
//                             formValidity.latitude === false ? 'is-invalid' :
//                                 formValidity.latitude === true ? 'is-valid' : ''
//                         }`}
//                         id="latitude"
//                         name="latitude"
//                         value={formData.latitude || ""}
//                         onChange={handleChange}
//                     />
//                     {formValidity.latitude === false && (
//                         <div className="invalid-feedback">
//                             Latitude must be in the following range [-90, 90]
//                         </div>
//                     )}
//                 </div>
//
//                 <div className="col">
//                     <label htmlFor="longitude" className="form-label">Longitude</label>
//                     <input
//                         type="number"
//                         step="0.000001"
//                         className={`form-control ${
//                             formValidity.longitude === false ? 'is-invalid' :
//                                 formValidity.longitude === true ? 'is-valid' : ''
//                         }`}
//                         id="longitude"
//                         name="longitude"
//                         value={formData.longitude || ""}
//                         onChange={handleChange}
//                     />
//                     {formValidity.longitude === false && (
//                         <div className="invalid-feedback">
//                             Longitude must be in the following range [-180, 180]
//                         </div>
//                     )}
//                 </div>
//             </div>
//
//             <div className="d-flex gap-2">
//                 <button type="submit" className={`btn btn-success ${isEditing ? 'btn-sm' : ''}`}>
//                     {isEditing ? 'Save' : 'Add City'}
//                 </button>
//                 <button
//                     type="button"
//                     className={`btn btn-danger ${isEditing ? 'btn-sm' : ''}`}
//                     onClick={onCancel}
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     );
// }
//
// export default CityFormComponent;