import React from 'react';
import { useState, useEffect } from 'react';
import { AiOutlineStar } from 'react-icons/ai';

const ReviewForm = ({ username, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };
    
    const handleSubmit = () => {
        if (rating > 0 || comment) {
            const newReview = { user: username, rating, comment };
            console.log('Submit review:', {rating, comment});

            const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
            allReviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(allReviews));

            alert('Thank you for your feedback!')
            onReviewSubmit(newReview);
            setRating(0);
            setComment('');
        } else {
            alert('Please submit a rating or a comment for your purchase.');
        }
    };
    
    return (
        <div className='reviews-container'>
            <div className='stars'>
                {[ 1,2,3,4,5].map(starValue => (
                    <span
                    key = {starValue}
                    style = {{cursor: 'pointer', color: starValue <= rating ? 'gold': 'grey'}}
                    onClick={() => handleStarClick(starValue)}
                    >
                        <AiOutlineStar size={20} />
                    </span>
                ))}
            </div>
            <div>
            <textarea
            placeholder='Please write a review'
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
            />
            </div>
            <button className='submit' onClick={handleSubmit}>Submit</button>
        </div>
    )
};

export default ReviewForm;
