//ToDo Rename this file, confused in the structure a bit
//ToDo make UI Look good. 

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContextProvider";
import useMainState from "../contexts/MainContextProvider";
import ENUMS from '../utils/enums';

const { SET_CART, SET_WISHLIST } = ENUMS;

const SingleProduct = ({ product }) => {
    // 0 ->  not done, 1 -> loading, 2-> successful, -1 -> failed
    const [addingToCart, setAddingToCart] = useState(0);
    const [addingToWishlist, setAddingToWishlist] = useState(0);
    const navigate = useNavigate();
    const { dispatch } = useMainState();
    const {isLoggedIn} = useAuth();


    const addToCart = () => {
        if(!isLoggedIn) {
            navigate('/login');
        }
        if (addingToCart === 2) return navigate("/cart");
        setAddingToCart(1);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/`, {
            productId: product._id,
        }).then((res) => {
            dispatch({ type: SET_CART, data: res.data });
            setAddingToCart(2);
        })
            .catch((e) => {
                console.log(e);
                setAddingToCart(-1);
            });
    };

    const addToWishlist = () => {
        if(!isLoggedIn) {
            navigate('/login');
        }
        if (addingToWishlist === 2) return navigate("/wishlist");
        setAddingToWishlist(1);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/wishlist/`, {
            productId: product._id,
        }).then((res) => {
            dispatch({ type: SET_WISHLIST, data: res.data });
            setAddingToWishlist(2);
        })
            .catch((e) => {
                console.log(e);
                setAddingToWishlist(-1);
            });
    };

    return (
        <div className="card card__border">
            <div className="card__body">
                <Link to={`/products/${product._id}`} style={{textDecoration: "none"}}>
                <img src={product.mainImage} alt="product" className="card__image" />
                    <h1 className="card__heading">{product.name}</h1>
                    <small>Delivery : {product.delivery} days</small>
                </Link>
                <br />
                {/* <p>{product.description}</p> */}
                <p style={{ padding: '0.3rem' }}>
                    ₹ {(product.price * (1 - product.discount)).toFixed(2)}{" "}
                    <strike style={{ color: 'grey' }}>₹ {product.price}</strike>{" "}
                </p>
                <p style={{ color: "var(--primary-color)", padding: '0.5rem' }}>
                    {(product.discount * 100).toFixed(2)} % off
                </p>
                <span className="card__badge">
                    {`${(product.discount * 100).toFixed(2)}% OFF`}
                </span>
                <button
                    className="button button--primary"
                    disabled={addingToCart === 1}
                    onClick={addToCart}
                >
                    {addingToCart === 2 ? "Go To Cart" : "Add To Cart"}
                </button>
                <br />
                <button
                    className="button button--outline-primary"
                    disabled={addingToWishlist === 1}
                    onClick={addToWishlist}
                >
                    {addingToWishlist === 2 ? "Go To Wishlist" : "Add To Wishlist"}
                </button>
            </div>
        </div>
    );
};

export default SingleProduct;
