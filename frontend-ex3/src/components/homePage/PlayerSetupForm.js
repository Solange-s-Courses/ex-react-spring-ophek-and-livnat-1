import CategoriesDropdown from "./CategoriesDropdown";
import React from "react";

function PlayerSetupForm ({handleSubmit, handleInputChange, isSubmitting, validation, formData, refreshTrigger}) {

    return (
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
                                refreshTrigger={refreshTrigger}
                                className={`form-select form-select-lg text-dark ${
                                    validation.category === false ? 'is-invalid' : validation.category === true 
                                        ? 'is-valid' : ''
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
                            disabled={isSubmitting} >

                            {isSubmitting ? (
                                <span>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Loading...
                                </span>
                            ) : (
                                <span className="d-flex align-items-center justify-content-center">Start Game →</span>
                            )}
                        </button>

                    </form>

                    <div className="mt-4 text-center">
                        <p>Ready to test your vocabulary skills?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerSetupForm;