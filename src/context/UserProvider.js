import React, { useState, useContext} from "react";

const userContext = React.createContext();

/**
 * Custom hook to access the user context.
 * @returns {Object} An object containing user-related state and functions.
 */
export function useUserContext() {
    return useContext(userContext);
}

/**
 * Provides user-related state and functions to components via the context API.
 * @function
 * @param {Object} props The component props.
 * @param {Node} props.children The children elements to render.
 * @returns {ReactElement} A ReactElement containing the user context provider.
 */
export function UserProvider(props) {

    const [contextUser, setContextUser] = useState(null);

    /**
     * Sets the user context to the given user data.
     * @param {Object} userData - The user data to set in the context.
     */
    const loginUser = (userData) => {
        setContextUser(userData);
      };
    
    /**
     * Removes the user context, effectively logging out the user.
     * This sets the contextUser state to null.
     */
    const logoutUser = () => {
        setContextUser(null);
      };
    
    const value = {
        contextUser, loginUser, logoutUser
    }

    return (
        <userContext.Provider value={value}>
            {props.children}
        </userContext.Provider>
    );
}