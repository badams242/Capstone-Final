import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setToken }) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            setToken('');
            localStorage.removeItem('token'); // Clear only the token from local storage
            window.alert('You have been logged out.');
            navigate('/login'); // Redirect to the login page
        }
    };

    return (
        <div className='logout'>
            <button onClick={logoutHandler}>Logout</button>
       </div>
    );
};

export default Logout;