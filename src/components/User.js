import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { getAPIData } from "../utils/utils";

function User() {
    const dbUsers = async () => {
        const users = await getAPIData('http://localhost:3333/read/users');
        return users
    };

    const [users, setUsers] = useState([]);

    const addUser = async (user) => {
        const newUser = await getAPIData('http://localhost:3333/create/user', 'POST', JSON.stringify(user));
        setUsers([newUser, ...users]);
    };

    const removeUser = async (id) => {
        await getAPIData(`http://localhost:3333/delete/user/${id}`, 'DELETE');
        setUsers(users.filter(user => user._id !== id));
    };

    useEffect(() => {
        dbUsers().then(users => setUsers(users));
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <UserForm onAddUser={addUser} />
            <UserList users={users} onRemoveUser={removeUser} />
        </div>
    );
}

export default User;