import React from "react";

function UserList(props) {
    return (
        <ul>
            {props.users.map(user => <li key={user._id}>{user.name}, {user.email} <button onClick={() => props.onRemoveUser(user._id)}>Eliminar</button></li>)}
        </ul>
    )
}

export default UserList;