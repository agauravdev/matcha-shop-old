import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../contexts/AuthContextProvider";
const NavigationBar = () => {
  const [searchTerm, setSearch] = useState("");
  const [toggleNav, setToggle] = useState(false);
  const {user, setUser} = useAuth();

  return (
    <nav className="navbar">
      <button className="navbar--toggle" onClick={() => setToggle((a) => !a)}>
        <i className="fas fa-bars"></i>
      </button>

      <NavLink to="/" className="nav--logo">
        Matcha Shop
      </NavLink>

      <ul className={`nav--main ${toggleNav ? "active" : ""}`}>
        <li>
          <input className="nav--search" type="text" name="searchBar" value={searchTerm} onChange={(e) => setSearch(e.target.value)}/>
          <NavLink
            to={{
              pathname: "/products",
              search: `?search=${searchTerm}`,
            }}
            className="nav--links"
            onClick={()=>setSearch('')}
          >
            <i className="fas fa-search"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav--links">
            Products
          </NavLink>
        </li>
        {!!user && <li><span style={{cursor: "pointer"}} className="nav--links" onClick={()=>setUser(null)}>Logout</span></li>}
        {!!user || 
        (<li>
          <NavLink to="/login" className="nav--links">
            Login
          </NavLink>
        </li>)}
        {/* <li>
          <NavLink to="/user" className="nav--links">
            My Profile
          </NavLink>
        </li> */}
      </ul>

      <ul
        className="nav--secondary"
        style={{ listStyle: "none", display: "flex" }}
      >
        <li>
          <NavLink to="/wishlist" className="nav--links">
            <i className="far fa-heart"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav--links">
            <i className="fas fa-shopping-cart"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default NavigationBar;
