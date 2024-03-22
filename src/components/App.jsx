import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Products from './Products';
import Login from './Login';
import Logout from './Logout';
import Data from './Data';
import Home from './Home';
import Cart from './Cart';
import AddressForm from './Checkout/AddressForm';
import Review from './Checkout/Review';
import Checkout from './Checkout/Checkout';
import PaymentForm from './Checkout/PaymentForm';
import RegisterForm from './RegisterForm';
import ProfilePage from './ProfilePage';
import '../style/app.css'
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState( localStorage.getItem('token') ||'');
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const {productItems} = Data

  const addToCart = (product) => {
    const productExists = cart.some(p => p.id === product.id);
      if (productExists) {
        setCart(cart.map(p => p.id === product.id ? {...p, quantity: p.quantity + 1 } : p));
      } else {
        setCart([...cart, {...product, quantity: 1}]);
      }
  }

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  }

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleHideCart = () => {
    setShowCart(false);
  };

  const incrementQuantity = (productToIncrement) => {
    setCart(cart.map(product=> product.id === productToIncrement.id 
      ? {...product, quantity: (product.quantity || 0) + 1 } : product
      ));
    };

  const decrementQuantity = (productToDecrement) => {
    setCart(cart.map(product => product.id === productToDecrement.id
      && product.quantity > 1
      ? {...product, quantity: product.quantity - 1 } : product
      ));
  };

  const totalCartItems = cart.reduce((acc, product) => acc + product.quantity, 0);
  console.log('Total Cart Items:', totalCartItems)

  const clearCart = () => {
    setCart([]);
};

  useEffect(()=> {
    localStorage.setItem('token', token);
  }, [token])

  return (
    <div className='App'>
    <Navbar
      setToken={setToken}
      setIsLogin={setIsLogin}
      cartItemCount={totalCartItems}
      isLogin={isLogin}
      />
    <Routes>
          <Route path='/' element={<Home isLogin={isLogin}/>} />
          <Route path='login' element={<Login token={token} setToken={setToken} setIsLogin={setIsLogin} setUserData={setUserData}/>} />
          <Route path='logout' element={<Logout setToken={setToken} />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='products' element={<Products onAddToCart={addToCart} handleShowCart={handleShowCart}/>} />
          <Route path='cart' element={<Cart cart={cart} removeFromCart={removeFromCart} 
            incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} clearCart={clearCart}
            />} />
          <Route path='checkout' element={<Checkout />} />  
          <Route path='address-form' element={<AddressForm />} />
          <Route path='payment-form' element={<PaymentForm />} />
          <Route path='review' element={<Review cart={cart} />}  />
          <Route path='users' element={<RegisterForm />}/>
    </Routes>  
    </div>
  )
};

export default App;