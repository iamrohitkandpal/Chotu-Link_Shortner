import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Chutku</Link>
            </div>

            <div className="nav-links">
                {isAuthenticated ? (
                    <>
                        <span>Hi, {user?.name || user?.email}</span>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={logout} className="nav-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar