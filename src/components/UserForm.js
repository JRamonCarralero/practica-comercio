import React from "react";
import "../css/UserForm.css";

function UserForm(props) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        props.onAddUser();
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <input
                type="hidden"
                name="_id"
                value={props.user._id}
                onChange={(e) => props.onSetUser({ ...props.user, _id: e.target.value })}
            />
            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={props.user.name}
                    onChange={(e) => props.onSetUser({ ...props.user, name: e.target.value })}
                    placeholder="Name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={props.user.email}
                    onChange={(e) => props.onSetUser({ ...props.user, email: e.target.value })}
                    placeholder="Email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={props.user.password}
                    onChange={(e) => props.onSetUser({ ...props.user, password: e.target.value })}
                    placeholder="Password"
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select
                    name="role"
                    value={props.user.role}
                    onChange={(e) => props.onSetUser({ ...props.user, role: e.target.value })}
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