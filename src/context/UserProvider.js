import React, { useState, useContext} from "react";

const userContext = React.createContext();

export function useUserContext() {
    return useContext(userContext);
}

export function UserProvider(props) {

    const [contextUser, setContextUser] = useState(null);

    const loginUser = (userData) => {
        setContextUser(userData);
      };
    
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