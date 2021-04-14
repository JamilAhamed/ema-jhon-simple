import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails =() =>{
     const {productKey} = useParams();
     const [product, setProduct] = useState({});

     useEffect(()=>{
               fetch('http://localhost:5100/products'+ productKey)
               .then( res => res.json())
                .then(data =>setProduct(data));
     }, [productKey])
     
     return(
         <div>
             <h1> Your product Details. </h1>
             <Product  showAddToCart={false} product={product}></Product>
         </div>
     )
};
export default ProductDetails;