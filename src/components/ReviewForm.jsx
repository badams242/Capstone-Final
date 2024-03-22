import React, { useState, useEffect } from 'react';
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
            console.log('Submit review:', { rating, comment });

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