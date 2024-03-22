import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productExists = cart.some(p => p.id === product.id);
    if (productExists) {
      setCart(cart.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const handleShowCart = () => {
    // Define the logic for showing the cart
  };

  const handleHideCart = () => {
    // Define the logic for hiding the cart
  };

  const incrementQuantity = (productToIncrement) => {
    setCart(cart.map(product => product.id === productToIncrement.id
      ? { ...product, quantity: (product.quantity || 0) + 1 } : product
    ));
  };

  const decrementQuantity = (productToDecrement) => {
    setCart(cart.map(product => product.id === productToDecrement.id
      && product.quantity > 1
      ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const setUserData = () => {
    // Define the logic for setting user data
  };

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='App'>
      <Router>
        <Navbar
          setToken={setToken}
          setIsLogin={setIsLogin}
          cartItemCount={cart.length}
          isLogin={isLogin}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login token={token} setToken={setToken} setIsLogin={setIsLogin} setUserData={setUserData} />} />
          {/* Rest of the code... */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;