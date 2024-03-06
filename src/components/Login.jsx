import React, { useEffect, useState }from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({token, setToken, setIsLogin, setUserData}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

        async function fetchLogin(username, password) {
            try {
                const response = await fetch('https://fakestoreapi.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        username,
                        password,
                    }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    return data;
                } else if (response.status === 401) {
                    setError('Incorrect username or password. Please try again.');
                    return null;
                } else {
                    setError('Unexpected error occurred. Please try again.');
                    return null;
                }
            } catch(err) {
                console.error(err);
                setError('Uh oh, something went wrong. Please try again.');
            }
        };

        async function fetchUserData(token) {
            return {
                name: 'Timmy Turner',
                orders: [{ id: 1, orderName: 'Sample Order'},]
            };
        };
        
        const handleClick = async (e) => {
            e.preventDefault()
            const data = await fetchLogin(username, password);

            if (data && data.token) {
                const {token: fetchedToken} = data;
                setToken(fetchedToken);
                setIsLogin(true);

                navigate('/products');
            }
        };

        // useEffect(()=> {
        //     if (token) {
        //         localStorage.setItem('token', token)
        //     } else {
        //         localStorage.removeItem('token')
        //     }
        // }, [token]);

        return (
            <div className='login'>
                <form onSubmit={handleClick}>
                <div className='login-inputs'>
                    
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    {error && <small className='errorMessage'>{error}</small>}
                    <button className='login_btn'>Login</button>
                </div>
                </form>
                <Link to='/users' style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>New? Register for special offers!</Link>
            </div>
            
        )
    };

export default Login;