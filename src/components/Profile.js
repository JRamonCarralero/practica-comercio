import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { getAPIData } from "../utils/utils";
import { useUserContext } from "../context/UserProvider";
import "../css/Profile.css";

/**
 * Componente que muestra el perfil del usuario logueado y permite
 * editar sus datos y cambiar su contraseña.
 *
 * @returns {JSX.Element}
 */
function Profile() {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (!sessionUser) {
        redirect('/');
    }
    const [user, setUser] = useState(sessionUser);
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');

    const { contextUser, loginUser } = useUserContext();
    console.log('contextUser', contextUser);

    /**
     * Handles the form submission event for the user profile edit form.
     * Prevents the default form submission behavior, updates the user
     * information and stores the updated user in session storage.
     * 
     * @param {Event} e - The form submission event
     */
    const handleSubmitProfile = async (e) => {
        e.preventDefault();

        const data = {
            name: user.name,
            email: user.email
        }

        await getAPIData(`http://localhost:3333/update/user/${user._id}`, 'PUT', JSON.stringify(data));
        sessionStorage.setItem('user', JSON.stringify(user));
        loginUser(user);
    }

    /**
     * Handles the form submission event for the change password form.
     * Prevents the default form submission behavior, checks if the new
     * password matches the repeat password, and if the old password is
     * correct, updates the user's password and notifies the user of the
     * result.
     * 
     * @param {Event} e - The form submission event
     */
    const handleSubmitPwd = async (e) => {
        e.preventDefault();

        if (newPwd !== repeatPwd) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        const data = {
            oldPwd: oldPwd,
            newPwd: newPwd
        }
        const response =await getAPIData(`http://localhost:3333/update/userpwd/${user._id}`, 'PUT', JSON.stringify(data));
        if (response === 'OK') {
            alert('Contraseña actualizada');
            setOldPwd('');
            setNewPwd('');
            setRepeatPwd('');
        } else {
            alert('Contraseña incorrecta');
        }
    }
    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <form className="profile-form" onSubmit={handleSubmitProfile}>
                <input
                    type="hidden"
                    name="_id"
                    value={user._id}
                />
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Name"
                        required
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
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Rol</label>
                    <span>{user.role}</span>
                </div>
                <button className="submit-btn" type="submit">Guardar cambios</button>
            </form>
            <h2 className="profile-title">Cambio de contraseña</h2>
            <form className="pwd-form" onSubmit={handleSubmitPwd}>
                <div className="form-group">
                    <label htmlFor="password">Tu contraseña actual</label>
                    <input
                        type="password"
                        name="password"
                        value={oldPwd}
                        placeholder="Password"
                        onChange={(e) => setOldPwd(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Tu nueva contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={newPwd}
                        placeholder="Password"
                        onChange={(e) => setNewPwd(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Repite tu nueva contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={repeatPwd}
                        placeholder="Password"
                        onChange={(e) => setRepeatPwd(e.target.value)}
                        required
                    />
                </div>
                <button className="submit-btn" type="submit">Guardar contraseña</button>
            </form>
        </div>
    );
}

export default Profile;