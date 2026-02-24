import {useState} from 'react'
import {useNavigate, Link} from "react-router-dom";
import type {FormEvent} from "react";
import api from "../api/axios";
import {useAuth} from "../context/AuthContext";
import type {AuthResponse} from "../types/auth";
//import "../styles/auth.css";


const Register =()=>{
    const navigate = useNavigate();
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e:FormEvent<HTMLFormElements>) => {
        e.preventDefault();
        setError("");
        
        try{
            const {data} = await api.post<AuthResponse>("/auth/register",{
                email,
                password,
            });
            login(data.token);
            navigate("/dashboard");
        }catch(err: any){
            setError(err.response?.data?.message || "Registration failed");
        }
    }
    return (
        <>
          <div clasName="auth-container">
            <div className='auth-card'>
                <h2 className='auth-title'> Create Account </h2>
                {
                    error && <div className="auth-error">{error}</div>
                }
                <form onSubmit={handleSubmit}>
                    <input type="email" 
                        placeholder="Email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="auth-input"
                        required
                    />
                    <button type="submit" className='auth-button'>Register</button> 
                </form>

                <div className='auth-footer'>
                    Already have an account?{" "}
                    <Link to="/" className='auth-link'>
                        Login
                    </Link>
                </div>
            </div>
          </div>
        </>
    )
};
export default Register;