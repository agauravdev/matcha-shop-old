import NavigationBar from './components/NavigationBar'
import {Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './views/Login';
import ProductListing from './views/Products/ProductListing';
import Product from './views/Products/Product';
// import Register from './views/Register';
import Home from './views/Home';
import Cart from './views/Cart';
import Wishlist from './views/Wishlist';
function App() {
    return <>
    <NavigationBar />
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductListing/>}/>
        <Route path="/products/:id" element={<Product/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="/register" element={<Register/>}/> */}
        {/* Private Routes */}
        <PrivateRoute path="/wishlist" element={<Wishlist/>}/>
        <PrivateRoute path="/cart" element={<Cart/>}/>
        
    </Routes>
    </>
}

export default App;
