import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImages from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder =() => {
       setCart([]);
       setOrderPlaced(true);
        processOrder();

    }
   
const removeProduct = (productKey) =>{
  
    const newcart = cart.filter(pd => pd.key !== productKey)
    setCart(newcart);
    removeFromDatabaseCart(productKey);
}
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys= Object.keys(savedCart);

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd=> pd.key === key);
            product.quantity =savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImages}></img>
    }
 
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd =>  <ReviewItem 
                        key={pd.key}
                        removeProduct = {removeProduct}
                        product={pd}></ReviewItem> )
                }
                { thankyou}
                <div className="cart-Container">
                    <Cart cart={cart}>
                        <button onClick={handlePlaceOrder} className="main-button" >Place Order</button>
                    </Cart>
                </div>
          
            </div>
        </div>
    );
};

export default Review;