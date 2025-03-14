import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { getAPIData } from "../utils/utils";
import "../css/User.css";

function User() {
    const dbUsers = async () => {
        const users = await getAPIData('http://localhost:3333/read/users');
        return users
    };

    const [users, setUsers] = useState([]);

    const addUser = async (user) => {
        if (user._id) {
            updateUser(user);
        } else {
            createUser(user);
        }
    };

    const createUser = async (user) => {
        console.log('create user', user);
        //const newUser = await getAPIData('http://localhost:3333/create/user', 'POST', JSON.stringify(user));
        //setUsers([newUser, ...users]);
    }

    const updateUser = async (user) => {
        console.log('update user', user);
    }

    const removeUser = async (id) => {
        await getAPIData(`http://localhost:3333/delete/user/${id}`, 'DELETE');
        setUsers(users.filter(user => user._id !== id));
    };

    useEffect(() => {
        dbUsers().then(users => setUsers(users));
    }, []);

    return (
        <div className="user-container">
            <h2 className="user-title">Usuarios</h2>
            <UserForm onAddUser={addUser} />
            <UserList users={users} onRemoveUser={removeUser} />
        </div>
    );
}

export default User;