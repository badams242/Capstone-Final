import React, { useState, useEffect } from 'react';

const SingleProduct = ({productId}) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const url = `https://fakestoreapi.com/products/${productId}`;

        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setProduct(data);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error.toString());
            setIsLoading(false);
        });
    }, [productId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>{product.category}</p>
            <p>Price: {product.price}</p>
        </div>   
    );
};

export default SingleProduct;
