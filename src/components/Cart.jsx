import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartPageContainer, CartContainer, CartHeader, CartItem, ProductTitle, ProductPrice, QuantityControl, Button, CartTotal } from './StyledCartComponents';

const Cart = ({ cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }) => {
    const navigate = useNavigate();
    const total = cart.reduce((acc, product) => {
        const price = Number(product.price) || 0;
        const quantity = Number(product.quantity) || 0;
        return acc + price * quantity;
    }, 0);
    
    const handleReturn = () => {
        navigate('/products');
    }

    const handleCheckout = () => {
        clearCart();
        navigate('/checkout');
    }
    return (
        <CartPageContainer>
            <CartContainer>
            <CartHeader>Shopping Cart</CartHeader>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                cart.map((product, index) => (
                    <CartItem key={index}>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductPrice>{`Price: ${product.price}`}</ProductPrice>
                            <QuantityControl>
                                <Button onClick={()=> decrementQuantity(product)}>-</Button>
                                <span>{product.quantity}</span>
                                <Button onClick={()=> incrementQuantity(product)}>+</Button>
                            </QuantityControl>
                            <Button 
                            onClick={()=> removeFromCart(product)}>Remove From Cart
                            </Button>
                            </CartItem>
                        ))
                    )}
                            <CartTotal>
                                Total: ${total.toFixed(2)}  
                            </CartTotal>
                            <button className='backToProducts_btn' onClick={handleReturn}>Return to Products
                            </button>
                            <button className='checkout_btn' onClick={handleCheckout}>Ready to Checkout?</button>
                    </CartContainer>               
            </CartPageContainer>
    );
};

export default Cart;