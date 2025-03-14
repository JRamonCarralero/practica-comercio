import React from "react";
import "../css/UserList.css";

/**
 * Renders a table displaying a list of users with options to edit or remove each user.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.users - An array of user objects to display.
 * @param {function} props.onEditUser - Function to call when editing a user.
 * @param {function} props.onRemoveUser - Function to call when removing a user.
 */
function UserList(props) {
    return (
        <table className="user-table" id="user-table">
            <thead>
                <tr className="table-header-row">
                    <th className="th">Nombre</th>
                    <th className="th">Email</th>
                    <th className="th-role">Rol</th>
                    <th className="th-btn"></th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((user) => (
                    <tr className="table-row" key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="td-btn">
                            <button className="table-btn" onClick={() => props.onEditUser(user)}>✎</button>
                            <button className="table-btn" onClick={() => props.onRemoveUser(user._id)}>🗑</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserList;