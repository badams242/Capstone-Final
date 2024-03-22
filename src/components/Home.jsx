import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineStar } from 'react-icons/ai';
import ReviewForm from "./ReviewForm";
import { Carousel } from "react-responsive-carousel";

const Home = (isLogin) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    // const [reviews, setReviews] = useState([]);
    

    useEffect(()=> {
        const fetchSomeProducts = async ()=> {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=4');
                if (!response.ok) {
                    throw new Error('Error with network response');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchSomeProducts();

        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        setReviews(storedReviews);
    }, []);

    return(
        <div className='home'>
            <div className='cover-container'>
            <img className='cover' src='https://i1.sndcdn.com/artworks-U0w8JIXyYA2CeaDD-ZoVPAw-t500x500.jpg'
                alt='coverPic' style={{ width: "100%" }} />
            <div className='overlay-text'>Say Hello to Our Latest Arrivals</div>
            <button className='shop-now' onClick={() => navigate('/products')}>Shop Now</button>
            </div>
            <h3>Best Sellers</h3>
            <div className='products'>
                {error ? (
                    <div>Error: {error}</div>
                ):(
                    products.map(product => (
                        <div key={product.id} className='product'>
                            <h4>{product.title}</h4>
                            <img src={product.image} alt={product.title} />
                            <div className='details'>
                                <span>{`Category: ${product.category}`}</span>
                                <span className='price'>${product.price}</span>
                        </div>
                    </div>
                    ))
                )}
            </div>
            <div className='submitted-reviews'>
            {reviews.length > 0 && (
                <>
                    <h3>Hear what our customers are saying!</h3>
                        {reviews.map((review, index) => (
                            <div key={index} className='review'>
                                <div className='review-rating'>
                                {[1, 2, 3, 4, 5].map(starValue => (
                                <AiOutlineStar
                                    key={starValue}
                                    color={starValue <= review.rating ? "gold" : "grey"}
                                    size={20}
                                />
                                ))}
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;