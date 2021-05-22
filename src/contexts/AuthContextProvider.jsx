import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

console.log({axios});

// Will Contain the user and the jwt token
export const AuthContextProvider = ({ children }) => {
  const userFromLS = localStorage.getItem('user');

  const [user, setUser] = useState(userFromLS ? JSON.parse(userFromLS) : null);

  
  const setUserAndLocalStorage = (u) => {
    if(u){
      console.trace({user:u})
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));
      axios.defaults.headers.common['Authorization'] = u.jwt;
    } else {
      setUser(null);
      localStorage.removeItem('user');
      axios.defaults.headers.common['Authorization'] = undefined;
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser : setUserAndLocalStorage, isLoggedIn : !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
