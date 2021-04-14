import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] =useState('')
    document.title ="Shop More"

    useEffect(()=>{
        
        fetch('http://localhost:5100/products?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [search])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch("http://localhost:5100/productByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then(res => res.json())
      .then(data => setCart (data));
    }, [])

    const handleSearch = event =>{
        setSearch(event.target.value)
    }
    
    const handleAddProduct =(product) =>{
        const  toBeAddedKey = product.key;
        const SameProduct = cart.find(pd => pd.key === toBeAddedKey.key)
        let count = 1;
        let newCart;
        if(SameProduct){
             count = SameProduct.quantity + 1;
            SameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart =[...others,SameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart)
        addToDatabaseCart(product.key,count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} palceholder="search product"/>
                    {
                        products.map(pd => <Product 
                            key={pd.key}
                            showAddToCart = {true}
                            handleAddProduct = {handleAddProduct}
                            product ={pd}
                            ></Product>)
                    }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review">
                <button className="main-button" >Review Order</button>
                </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;