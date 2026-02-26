import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import api from "../api/axios";
import {useAuth} from "../context/AuthContext";
import type {AuthResponse} from "../types/auth";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate()
    const {login} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const { data } = await api.post<AuthResponse>("/auth/login", {
                email,
                password,
            });
            login(data.token, data.user);
            navigate("/dashboard");
        } catch (err:any) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
             } else {
                setError("An error occurred. Please try again.");
             }
             console.error(err);
         }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>
                Don't have an account? <Link className="register-link" to="/register">Register here</Link>
            </p>
        </div>
    ); 

}
export default Login;