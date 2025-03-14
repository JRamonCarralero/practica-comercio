import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { getAPIData } from "../utils/utils";
import "../css/User.css";

/**
 * The User component renders a page for managing users.
 * It fetches the list of users from the database and renders a form for adding or updating users.
 * The component also renders a table with the list of users, each row having options to edit or remove the user.
 * @component
 * @example
 * <User />
 */
function User() {
    /**
     * Fetches the list of users from the database.
     * @async
     * @function
     * @returns {Promise<Array>} A promise that resolves to an array of user objects.
     */
    const dbUsers = async () => {
        const users = await getAPIData('http://localhost:3333/read/users');
        return users
    };

    const [user, setUser] = useState({
            _id: "",
            name: "",
            email: "",
            password: "",
            role: "user"
        });
    const [users, setUsers] = useState([]);

    /**
     * Adds a new user to the database or updates an existing one.
     * If the user state has an _id, it calls updateUser, otherwise it calls createUser.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    const addUser = async () => {
        if (user._id) {
            updateUser();
        } else {
            createUser();
        }
    };

    /**
     * Creates a new user in the database with the data in the user state.
     * When the user is created, the users list is updated and the user state is cleared.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    const createUser = async () => {
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        }
        const newUser = await getAPIData('http://localhost:3333/create/user', 'POST', JSON.stringify(data));
        setUsers([newUser, ...users]);
        clearUser();
    }

    /**
     * Updates a user in the database with the given id with the new data in the user state.
     * @function
     * @async
     * @returns {Promise<void>}
     */
    const updateUser = async () => {
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        }
        const id = user._id;
        await getAPIData(`http://localhost:3333/update/user/${id}`, 'PUT', JSON.stringify(data));
        setUsers(users.map(u => u._id === id ? user : u));
        clearUser();
    }

    /**
     * Resets the user state to its initial values.
     * This function is called whenever a user is added or updated.
     * @function
     */
    const clearUser = () => {
        setUser({
            _id: "",
            name: "",
            email: "",
            password: "",
            role: "user"
        });
    }

    /**
     * Remove the user with the given id from the database and update the users state.
     * @param {string} id the id of the user to remove
     */
    const removeUser = async (id) => {
        await getAPIData(`http://localhost:3333/delete/user/${id}`, 'DELETE');
        setUsers(users.filter(user => user._id !== id));
    };

    /**
     * Set the user state to the given user.
     * @param {Object} user the user to set
     */
    const editUser = (user) => {
        setUser(user);
    }

    useEffect(() => {
        dbUsers().then(users => setUsers(users));
    }, []);

    return (
        <div className="user-container">
            <h2 className="user-title">Usuarios</h2>
            <UserForm user={user} onAddUser={addUser} onSetUser={setUser} />
            <UserList users={users} onRemoveUser={removeUser} onEditUser={editUser} />
        </div>
    );
}

export default User;