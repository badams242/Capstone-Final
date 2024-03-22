import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/app.css';

const ProductDetailModal = ({ product, onClose }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>&times;</span>
                <h2>{product.title}</h2>
                <img src={product.image} alt={product.title} />
                <p>{product.description}</p>
                <p>{`Category: ${product.category}`}</p>
                <p>{`Price: ${product.price}`}</p>
            </div>
        </div>
    );
};

const Products = ({ onAddToCart, handleShowCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);
    const [sort, setSort] = useState('');
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        title: '',
        image: '',
        description:'',
        category:'',
        price:'',
    });

const openModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
};

const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
};

useEffect (()=> {
    setLoading(true);
    const fetchProducts = async() => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if(!response.ok) {
                throw new Error('Unable to fetch products.');
            }
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (error) {
            console.error('Sorry, unable to fetch products:', error);
        } finally {
            setLoading(false);
        }
        
    };
    fetchProducts();
}, []); 

const getUniqueCategories = () => {
    const categoriesSet = new Set(products.map(product => product.category));
    return Array.from(categoriesSet);
};

const filterProducts = () => {
    return products.filter((product)=> {
        const {title, description, category } = product;
        return(
            title.toLowerCase().includes(filter.title.toLowerCase()) && 
            description.toLowerCase().includes(filter.image.toLowerCase()) &&
            category.toLowerCase().includes(filter.description.toLowerCase()) &&
            (selectedCategory === '' || category.toLowerCase() === selectedCategory.toLowerCase()) 
        );
    });
};

const handleFilterChange = (e) => {
    const {name, value} = e.target;
    setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
    }));
};

const toggleDetails = (productId) => {
    setShowDetails((prevState)=> ({
        ...prevState,
        [productId]: !prevState[productId],
    }))
};

const addToCart = (product) => {
    // check if product already exists in cart
    const existingProduct = cart.find(p => p.id === product.id);
    
    if (existingProduct) {
        // increment quantity if product already exist in cart
        setCart(cart.map(p => p.id === product.id ? {...p, quantity: p.quantity + 1 } : p));
    } else {
        // add new product to cart with quantity of 1
        setCart([...cart, { ...product, quantity: 1 }]);
    }
    navigate('/cart');
};

const handleAddToCart = (product) => {
    onAddToCart(product);
    handleShowCart();
};

const incrementQuantity = (product) => {
    setCart(cart.map(p=> p.id === product.id ? {...p, quantity: p.quantity + 1 } : p));
    };

    const decrementQuantity = (product) => {
    const existingProduct = cart.find(p=> p.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
        setCart(cart.map(p=> p.id === product.id ? {...p, quantity: p.quantity - 1 } : p));
    } else {
        removeFromCart(product);
    }
    };

    const removeFromCart = (product) => {
    setCart(cart.filter(p=> p.id !== product.id));
    };

    const sortedProducts = (productsToSort) => {
        let sorted = [...productsToSort];
        switch(sort) {
            case 'priceAsc':
                return sorted.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                return sorted.sort((a, b) => b.price - a.price);
                break;
            case 'titleAsc':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'titleDesc':
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }
        return sorted;
    }

    return (
        <div className='products-container2'>
            <div className='select-menu'>
                <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value);
                    console.log("Selected Category:", e.target.value);}} >
                <option value=''>Select A Category</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value='electronics'>Electronics</option>
                <option value='jewelery'>Jewelry</option>
                </select>
            </div> 
            <div>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value=''>Sort by</option>
                    <option value='priceAsc'>Price: Low to High</option>
                    <option value='priceDesc'>Price: High to Low</option>
                    <option value='titleAsc'>Title: A-Z</option>
                    <option value='titleDesc'>Title: Z-A</option>
                </select>
            </div>
            <div className='products-container'>
                {loading && (
                    <div>
                        {''}
                        <h1>Loading...</h1>
                    </div>
                )}
                
                {sortedProducts(filterProducts()).map((product) => (
                    <div key={product.id} className='card'>
                        <div>
                            <img src={product.image} alt={product.title}/>
                        </div>
                        <div className='card-description'>
                        <h4>{product.title}</h4>
                        <h4>{`Price: ${product.price}`}</h4>
                        <h4>{`Category: ${product.category}`}</h4>
                        {showDetails[product.id] ? (
                            <h4>{`Description: ${product.description}`}</h4>
                        ): null}
                        <div className='button-container'>
                        <button className='showDetails_btn' onClick={()=> openModal(product)}>
                            {showDetails[product.id] ? 'Close' : 'Show Details'}
                        </button>
                        <button className='addToCart_btn' onClick={() => handleAddToCart(product)}>Add To Cart
                        </button>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && selectedProduct && (
                <ProductDetailModal product={selectedProduct} onClose={closeModal} />
            )}
            </div>
    );
};
export default Products;
