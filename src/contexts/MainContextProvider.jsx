import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import useAuth from "./AuthContextProvider";
import reducer from './reducer';
import ENUMS from '../utils/enums';

const { SET_CART, SET_WISHLIST, SET_PRODUCTS } = ENUMS;
const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    wishlist: []
  });



  const { user } = useAuth();

  useEffect(() => {
    const fetchAllData = async () => {
      const promiseArray = [];
      promiseArray.push(axios.get(`${process.env.REACT_APP_SERVER_URL}/products`));
      if (user) {
        promiseArray.push(axios.get(`${process.env.REACT_APP_SERVER_URL}/cart`));
        promiseArray.push(axios.get(`${process.env.REACT_APP_SERVER_URL}/wishlist`));
      }
      try {
        const results = await Promise.all(promiseArray);
  
        dispatch({ type: SET_PRODUCTS, data: results[0].data });
        if (user) {
          dispatch({ type: SET_CART, data: results[1].data });
          dispatch({ type: SET_WISHLIST, data: results[2].data });
        }
        
      } catch (e) {
        console.log(e);
      }
    }
    
    fetchAllData();
  }, [user]);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};

const useMainState = () => useContext(MainContext);

export default useMainState;
