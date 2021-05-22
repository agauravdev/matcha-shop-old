import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return <div className="home">
        <h2 className="home--heading"> Matcha Shop </h2>
        <h3 className="home--tagline"> Buy the best developer apparel here </h3>
        <Link to="/products" className="button button--primary">Shop Now</Link>
    </div>
}

export default Home;