//ToDo make Login look good. UI. 

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContextProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/products');
        }
    });

    const attemptLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, { email, password });
            setUser({ user: response.data.user, jwt: response.data.token });
            console.log("logged in")
        } catch (e) {
            console.log("error in logging in");
            console.log(e, e?.response)
            setError(e?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className="login-container">
            <input className="input" placeholder="email" type="text" onChange={(e) => setEmail(e.target.value)} />
            <input className="input" placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            {!!error && (<small className="login-error">{error}</small>)}
            <button className="button button--primary" onClick={attemptLogin} disabled={loading}>{loading ? "Trying Login" : "Login"}</button>
        </div>
    </>
}

export default Login;