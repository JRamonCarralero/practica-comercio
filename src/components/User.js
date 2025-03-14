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

    const [user, setUser] = useState({
            _id: "",
            name: "",
            email: "",
            password: "",
            role: "user"
        });
    const [users, setUsers] = useState([]);

    const addUser = async () => {
        if (user._id) {
            updateUser();
        } else {
            createUser();
        }
    };

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

    const clearUser = () => {
        setUser({
            _id: "",
            name: "",
            email: "",
            password: "",
            role: "user"
        });
    }

    const removeUser = async (id) => {
        await getAPIData(`http://localhost:3333/delete/user/${id}`, 'DELETE');
        setUsers(users.filter(user => user._id !== id));
    };

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