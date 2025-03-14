import React, { useState } from "react";
import "../css/UserForm.css";

function UserForm(props) {
    const [user, setUser] = useState({
        _id: "",
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        props.onAddUser(user);

        setUser({
            _id: "",
            name: "",
            email: "",
            password: "",
            role: "user"
        })
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <input
                type="hidden"
                name="_id"
                value={user._id}
                onChange={(e) => setUser({ ...user, _id: e.target.value })}
            />
            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select
                    name="role"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button className="submit-btn" type="submit">Guardar</button>
        </form>
    )
}

export default UserForm;