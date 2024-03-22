import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewForm from './ReviewForm';

const Container = styled.div`
    background-color: rgb(7, 7, 19);
    color: white;
    padding: 2rem;
    font-family: Arial;
`;

const Header = styled.h2`
    border-bottom: 2px solid #333;
    padding-bottom: 1rem;
`;

const Input = styled.input`
    padding: 0.5rem;
    margin:0.5rem 0;
    width: 100%;
    max-width: 300px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border: white;
    background: linear-gradient(135deg, #0055a3, rgb(3, 3, 10));
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
    color: white;
    cursor: pointer;

    &:hover {
        background: linear-gradient(135deg, #0055a3, rgb(3, 3, 10));
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);;
    }
`;

const SubHeader = styled.h3`
    border-bottom: 2px solid #333;
    padding-bottom: 1rem;
`;

const List = styled.ul`
    list-style-type: none;
`;

const ListItem = styled.li`
    margin-bottom: 0.5rem;
`;

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        orderHistory: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [reviews, setReviews] = useState([]);

    const handleNewReview = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
    };

    useEffect(() => {
        const fetchUserDataFromAPI = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/users/3');
                if(response.ok){
                    const userDataFromAPI= await response.json();
                    if(!userDataFromAPI.orderHistory) {
                        userDataFromAPI.orderHistory=[];
                    } 
                    setUser({
                        ...user,
                        name: userDataFromAPI.name,
                        email: userDataFromAPI.email,
                        phone: userDataFromAPI.phone,
                        orderHistory: userDataFromAPI.orderHistory || []
                    });
                } else {
                    console.error('Unable to fetch user data from API');
                } 
            } catch(error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserDataFromAPI();
    }, []);

    useEffect(() => {
        const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const userReviews = allReviews.filter(review => review.user === user.username);
        setReviews(userReviews);
    }, [user.username, reviews]);

    const handleSave = () => {
        saveToLocalStorage();
        setIsEditing(false);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const addMockOrder = () => {
        const newOrder = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0], 
            itemName: "Sample Item",
            price: Math.floor(Math.random() * 100) + 1 
        };

        setUser(prevUser => ({
            ...prevUser,
            orderHistory: [...prevUser.orderHistory, newOrder]
        }));

        saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('user', JSON.stringify(user));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]:value
        }));
    };

    return (
        <Container>
            <div>
                <div>
                    <Header>Profile Page</Header>
                    <Input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Name"
                        readOnly={!isEditing}
                    />
                    <Input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        readOnly={!isEditing}
                    />
                    <Input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        readOnly={!isEditing}
                    />
                    <Button edit onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
                    <Button onClick={handleSave}>Save</Button>
                    {isSaved && <span>Data Saved!</span>}
                </div>
                <div>
                    <SubHeader>Order History</SubHeader>
                    <List>
                        {user.orderHistory.map(order => (
                            <ListItem key={order.id}>
                                {order.date} - {order.itemName} - ${order.price}
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={addMockOrder}>View Previous Order</Button>
                </div>
                <div>
                    <SubHeader>Submit a Review</SubHeader>
                    <ReviewForm username={user.username} onReviewSubmit={handleNewReview} />
                </div>
                <div>
                    <SubHeader>Your Reviews</SubHeader>
                    <List>
                        {reviews.map((review, index) => (
                            <ListItem key={index}>
                                Rating: {review.rating} Star(s), Comment: {review.comment}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </Container>
    );
};

export default ProfilePage;