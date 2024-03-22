import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        email:'',
        username:'',
        password:'',
        name: {
            firstname:'',
            lastname:''
        },
        address: {
            city:'',
            street:'',
            number:'',
            zipcode:'',
            geolocation:{
                lat:'',
                long:''
            }
        },
        phone:''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setRegisterData(prevState => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: value
                }
            }));
        } else {
            setRegisterData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                navigate('/products');
            } else {
                const errorData = await response.json();
                console.error('Error:', response.status, errorData);
            }
        } catch (error) {
            console.error('Error:', error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='name.firstname'
                placeholder='First Name'
                value={registerData.name.firstname}
                onChange={handleInputChange}
            />
            <input
                type='text'
                name='name.lastname'
                placeholder='Last Name'
                value={registerData.name.lastname}
                onChange={handleInputChange}
            />
            <input
                type='text'
                name='email'
                placeholder='Email'
                value={registerData.email}
                onChange={handleInputChange}
            />
            <input
                type='text'
                name='username'
                placeholder='Username'
                value={registerData.username}
                onChange={handleInputChange}
            />
            <input
                type='password'
                name='password'
                placeholder='Password'
                value={registerData.password}
                onChange={handleInputChange}
            />
            <h3>Address</h3>
            <input
                type='text'
                name='address.city'
                placeholder='City'
                value={registerData.address.city}
                onChange={handleInputChange}
            />
             <input
                type='text'
                name='address.street'
                placeholder='Street'
                value={registerData.address.street}
                onChange={handleInputChange}
            />
             <input
                type='text'
                name='address.number'
                placeholder='Number'
                value={registerData.address.number}
                onChange={handleInputChange}
            />
             <input
                type='text'
                name='address.zipcode'
                placeholder='Zipcode'
                value={registerData.address.zipcode}
                onChange={handleInputChange}
            />
            <h4>Geolocation</h4>
             <input
                type='text'
                name='address.geolocation.lat'
                placeholder='Latitude'
                value={registerData.address.geolocation.lat}
                onChange={handleInputChange}
            />
              <input
                type='text'
                name='address.geolocation.long'
                placeholder='Longitude'
                value={registerData.address.geolocation.long}
                onChange={handleInputChange}
            />
            <h3>Phone</h3>
            <input
                type='text'
                name='phone'
                placeholder='Phone'
                value={registerData.phone}
                onChange={handleInputChange}
            />
            <button className='register' type='submit'>Ready to Register?</button>
        </form>      
    );
}

export default RegisterForm;
