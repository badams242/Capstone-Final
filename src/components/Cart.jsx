import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartPageContainer, CartContainer, CartHeader, CartItem, ProductTitle, ProductPrice, QuantityControl, Button, CartTotal } from './StyledCartComponents';

import PropTypes from 'prop-types';

const Cart = ({ cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }) => {
    // component code here
};

Cart.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    incrementQuantity: PropTypes.func.isRequired,
    decrementQuantity: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
};


export default Cart;import React, { useState } from 'react';
