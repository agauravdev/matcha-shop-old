//ToDo Rename this file, confused in the structure a bit
//ToDo make UI Look good. 

import axios from "axios";
import { useState } from "react";
import useMainState from "../contexts/MainContextProvider";
import ENUMS from '../utils/enums';

const { SET_CART, SET_WISHLIST } = ENUMS;

const SingleProductCart = ({ product, quantity }) => {
    // 0 ->  not done, 1 -> loading, 2-> successful, -1 -> failed
    const [addingToWishlist, setAddingToWishlist] = useState(0);
    const {dispatch} = useMainState();


    const updateCart = (quantity) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/`, {
                productId: product._id,
                quantity
            }).then((res) => {
                dispatch({type: SET_CART, data: res.data});
            })
            .catch((e) => {
                console.log(e);
                //show error here.
            });
    };

    const addToWishlist = async () => {
        setAddingToWishlist(1);
        try{
            const {data : cart} = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/cart/`, {
                data : {productId: product._id}
            });
            const {data : wishlist} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/wishlist/`, {
                productId: product._id,
            });
            dispatch({type: SET_WISHLIST, data: wishlist});
            dispatch({type: SET_CART, data: cart});
        } 
        catch (err) {
            console.log(err);
            setAddingToWishlist(-1);
        }
    };

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
                <div style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <button
                    className="button button--primary"
                    onClick={() => {updateCart(quantity - 1)}}
                >
                    -
                </button>
                <span style={{padding: "0 1rem"}}>{quantity}</span>
                <button
                    className="button button--primary"
                    onClick={() => {updateCart(quantity + 1)}}
                >
                    +
                </button>
                </div>
                <br />
                <button
                    className="button button--outline-primary"
                    disabled={addingToWishlist === 1}
                    onClick={addToWishlist}
                >
                    Add To Wishlist
                </button>
            </div>
        </div>
    );
};

export default SingleProductCart;
