import { useParams } from "react-router-dom";
import useMainState from "../../contexts/MainContextProvider";
import ENUMS from '../../utils/enums';
import axios from 'axios';
import { useNavigate } from "../../../node_modules/react-router-dom/index";
import { useState } from "react";
import "./product.css";

const { SET_CART, SET_WISHLIST } = ENUMS;

const Product = () => {
    const { id } = useParams();

    const [addingToCart, setAddingToCart] = useState(0);
    const [addingToWishlist, setAddingToWishlist] = useState(0);
    const navigate = useNavigate();
    const { dispatch } = useMainState();


    const addToCart = () => {
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

    const {
        state: { products },
    } = useMainState();

    const product = products.find((p) => p._id === id);

    console.log({product})

    if(!product) return null;

    return <div className="product">
        <img src={product.mainImage} alt="Main" className="product__image"/>
        <div className="product__details">
            <h3 className="product__name">{product.name}</h3>
            <p className="product__description">Delivery : {product.delivery} days</p>
            <p className="product__description">{product.description}</p>
            <p style={{ padding: '0.3rem' }}>
                    ₹ {(product.price * (1 - product.discount)).toFixed(2)}{" "}
                    <strike style={{ color: 'grey' }}>₹ {product.price}</strike>{" "}
                </p>
                <p style={{ color: "var(--primary-color)", padding: '0.5rem' }}>
                    {(product.discount * 100).toFixed(2)} % off
                </p>
                <button
                    className="button button--primary"
                    disabled={addingToCart === 1}
                    onClick={addToCart}
                >
                    {addingToCart === 2 ? "Go To Cart" : "Add To Cart"}
                </button>
                <button
                    className="button button--outline-primary"
                    disabled={addingToWishlist === 1}
                    onClick={addToWishlist}
                >
                    {addingToWishlist === 2 ? "Go To Wishlist" : "Add To Wishlist"}
                </button>
        </div>
    </div>
}

export default Product;