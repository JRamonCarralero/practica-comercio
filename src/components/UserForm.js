import React from "react";
import "../css/UserForm.css";

/**
 * UserForm component renders a form for creating or updating user information.
 * It includes input fields for user details such as name, email, password, and role.
 * The form submission is handled by the handleSubmit function, which prevents
 * the default behavior and triggers the onAddUser function passed via props.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.user - The user object containing _id, name, email, password, and role
 * @param {Function} props.onAddUser - Function to call when the form is submitted
 * @param {Function} props.onSetUser - Function to update user state when input changes
 */
function UserForm(props) {
    /**
     * Handles the form submission event.
     * Prevents the default form submission behavior and calls the
     * onAddUser function passed via props to add a user.
     *
     * @param {Event} e - The form submission event
     */
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