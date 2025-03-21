import React from "react";
import { useUserContext } from "../context/UserProvider";
import "../css/Logout.css";

function Logout({ onSetIsLoggedIn, onSetIsAdmin }) {

    const { logoutUser } = useUserContext();

    const handleLogout = () => {
        logoutUser();
        onSetIsLoggedIn(false);
        onSetIsAdmin(false);
    };

    return (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    );
}

export default Logout;