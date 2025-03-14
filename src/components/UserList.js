import React from "react";
import "../css/UserList.css";

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
                    <tr className="table-row" key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="td-btn">
                            <button className="table-btn" onClick={() => console.log(user)}>✎</button>
                            <button className="table-btn" onClick={() => props.onRemoveUser(user._id)}>🗑</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserList;