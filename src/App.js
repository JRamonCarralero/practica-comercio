import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import Profile from './components/Profile';
import Ticket from './components/Ticket';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <Router>
      <header className='app-header'>
        <h1 className='app-title'>Mi Comercio</h1>
        <nav className='app-nav'>
          <ul className='app-nav-list'>
            <li className='app-nav-item'>
              <Link to="/">Login</Link>
            </li>
            <li className='app-nav-item'>
              <Link to="/products">Products</Link>
            </li>
            <li className='app-nav-item'>
              <Link to="/profile">Profile</Link>
            </li>
            <li className='app-nav-item'>
              <Link to="/ticket">Ticket</Link>
            </li>
            <li className='app-nav-item'>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <div className='app-content'>        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
