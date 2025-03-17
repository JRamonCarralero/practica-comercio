import React, { useState } from "react";
import { redirect } from "react-router-dom";
import "../css/Profile.css";

function Profile() {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (!sessionUser) {
        redirect('/');
    }
    const [user, setUser] = useState(sessionUser);
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        console.log(user);
    }

    const handleSubmitPwd = async (e) => {
        e.preventDefault();
        console.log(oldPwd, newPwd, repeatPwd);
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={sessionUser.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
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
                    />
                </div>
                <button className="submit-btn" type="submit">Guardar contraseña</button>
            </form>
        </div>
    );
}

export default Profile;