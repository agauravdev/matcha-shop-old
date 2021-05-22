//ToDo Rename this file, confused in the structure a bit
//ToDo make UI Look good. 

import axios from "axios";
import { useState } from "react";
import useMainState from "../contexts/MainContextProvider";
import ENUMS from '../utils/enums';

const { SET_CART, SET_WISHLIST } = ENUMS;

const SingleProductWishlist = ({ product }) => {
    // 0 ->  not done, 1 -> loading, 2-> successful, -1 -> failed
    const {dispatch} = useMainState();
    const [loading, setLoading] = useState(false);


    const addToCart = async () => {
        try {
            setLoading(true);
            const {data: wishlist} = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/wishlist/`, {
                data : {productId: product._id} 
            })
            const {data : cart} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/`, { productId: product._id });
            dispatch({type: SET_CART, data: cart});
            console.log({wishlist})
            dispatch({type: SET_WISHLIST, data: wishlist});
        } catch(e) {
            // user feedback here
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card card__border">
            <img src={product.mainImage} alt="product" />
            <div className="card__body">
                <h1 className="card__heading">{product.name}</h1>
                <small>Delivery : {product.delivery} days</small>
                <br />
                <p style={{padding: '0.3rem'}}>
                    ₹ {(product.price * (1 - product.discount)).toFixed(2)}{" "}
                    <strike style={{color: 'grey'}}>₹ {product.price}</strike>{" "}
                </p>
                <p style={{ color: "var(--primary-color)", padding: '0.5rem' }}>
                    {(product.discount * 100).toFixed(2)} % off
                </p>
                <span className="card__badge">
                    {`${(product.discount * 100).toFixed(2)}% OFF`}
                </span>
                <br />
                <button
                    disabled={loading}
                    className="button button--outline-primary"
                    onClick={addToCart}
                >
                    Move To Cart
                </button>
            </div>
        </div>
    );
};

export default SingleProductWishlist;
