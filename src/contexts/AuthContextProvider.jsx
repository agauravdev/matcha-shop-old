import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

// Will Contain the user and the jwt token
export const AuthContextProvider = ({ children }) => {
  const userFromLS = localStorage.getItem('user');
  const [user, setUser] = useState(userFromLS ? JSON.parse(userFromLS) : null);
  if(user) {
    axios.defaults.headers.common['Authorization'] = user.jwt;
  }
  
  const setUserAndLocalStorage = (u) => {
    if(u){
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));  
    } else 
    {
      setUser(null);
      localStorage.removeItem('user');
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser : setUserAndLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
