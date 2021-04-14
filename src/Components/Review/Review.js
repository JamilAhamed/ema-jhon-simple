import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import happyImages from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheackOut = () => {
    history.push("/Shipment");
  };

  const removeProduct = (productKey) => {
    const newcart = cart.filter((pd) => pd.key !== productKey);
    setCart(newcart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
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
  }, []);

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={happyImages}></img>;
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}
          ></ReviewItem>
        ))}
        {thankyou}
        <div className="cart-Container">
          <Cart cart={cart}>
            <button onClick={handleProceedCheackOut} className="main-button">
              Proceed CheackOut
            </button>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Review;
