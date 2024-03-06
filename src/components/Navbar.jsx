import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaShoppingCart, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import '../style/app.css';

const Navbar = ({ cartItemCount, isLogin, setToken, setIsLogin }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setIsLogin(true);
        }
    }, [setToken, setIsLogin])

    const handleLogout = () => {
        setToken('');
        localStorage.clear();
        window.alert('You have been logged out.');
        setIsLogin(false);
        navigate('/login');
    }
    return (
        <>
        <div className='navbar'>
            <h1 className='logo' >Forever Fashion</h1>
            <div className='navbar-links'>
                <Link to="/">Home</Link>
                {!isLogin && <Link to='/login'>Login</Link>}
                {isLogin && <Link to='/Profile'>Profile</Link>}
                {isLogin && (
                    <span onClick={handleLogout} className='navbar-icon-LO'>Logout</span>
                    )}                
                <Link to="/cart">
                    <FaShoppingCart title='Cart' />
                    {cartItemCount > 0 && (
                        <span className='cart-badge'>{cartItemCount}</span>
                    )}
                    </Link>                    
            </div>
        </div>
        <Outlet />
        </>
    )
};

export default Navbar;