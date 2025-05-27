import React from "react";
import {WordManagementProvider} from "../WordManagementContext";
import ManagePageContent from "./ManagePageContent"

/**
 * ManagePage component for managing words in the Hangman game.
 * This is the main container component that provides the WordManagementContext
 * to all child components.
 *
 * The component is split into two parts:
 * 1. ManagePage - Provides the Context Provider wrapper
 * 2. ManagePageContent - Contains the actual UI that consumes the Context
 *
 * @returns {JSX.Element} The complete manage page wrapped with Context Provider
 */
function ManagePage() {
    return (
        <WordManagementProvider>
            <ManagePageContent />
        </WordManagementProvider>
    );
}

export default ManagePage;