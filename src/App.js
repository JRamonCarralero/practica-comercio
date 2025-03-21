import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import Profile from './components/Profile';
import Ticket from './components/Ticket';
import User from './components/User';
import PrivateRoute from './PrivateRoute';
import { UserProvider } from './context/UserProvider';
import Logout from './components/Logout';

/**
 * The App component renders the entire application.
 * It wraps the UserProvider and contains the header with links to all pages,
 * and the main content area with the routes to all pages.
 */
function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);

  return (
    <UserProvider>
      <div className="App">
        <Router>
          <header className='app-header'>
            <h1 className='app-title'>Mi Comercio</h1>
            <nav className='app-nav'>
              <ul className='app-nav-list'>
                <li className='app-nav-item'>
                  <Link to="/profile">Profile</Link>
                </li>
                <li className='app-nav-item'>
                  <Link to="/ticket">Ticket</Link>
                </li>
                {isAdmin && (
                  <li className='app-nav-item'>
                    <Link to="/products">Products</Link>
                  </li>
                )}
                {isAdmin && (
                  <li className='app-nav-item'>
                    <Link to="/user">User</Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li className='app-nav-item'>
                    <Logout onSetIsLoggedIn={setIsLoggedIn} onSetIsAdmin={setIsAdmin} />
                  </li>
                )}
              </ul>
            </nav>
          </header>
          
          <div className='app-content'>        
            <Routes>
              <Route path="/" element={<Login onSetIsAdmin={setIsAdmin} onSetIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/products" element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/ticket" element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              } />
              <Route path="/user" element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
