import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login Successful");

            navigate("/dashboard");
        } catch (error) {
            alert(
                error.response?.data?.detail || "Login Failed"
            );
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>

                <h1>GoRoute-EZ</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

                <p
                    style={{
                        marginTop: "10px",
                        cursor: "pointer",
                        color: "blue",
                        textAlign: "center"
                    }}
                    onClick={() => navigate("/register")}
                >
                    Don't have an account? Register
                </p>

            </form>
        </div>
    );
}

export default Login;