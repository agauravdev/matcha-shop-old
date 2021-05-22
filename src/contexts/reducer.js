import ENUMS from '../utils/enums';

const { SET_CART, SET_WISHLIST, SET_PRODUCTS } = ENUMS;

const reducer = (state, action) => {
    const { type, data } = action;

    switch (type) {
        case SET_CART:
            return { ...state, cart: data };

        case SET_WISHLIST:
            return { ...state, wishlist: data };

        case SET_PRODUCTS:
            return { ...state, products: data };

        default:
            break;
    }
}

export default reducer;