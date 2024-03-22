import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({setToken}) => {
     const navigate = useNavigate();

    const logoutHandler = () => {
        setToken('');
        localStorage.clear();
        window.alert('You have been logged out.')
        navigate('/logout');
    };

    return (
        <div className='logout'>
            <button onClick={logoutHandler}>Logout</button>
       </div>
)
};

 export default Logout;