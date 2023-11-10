import React, { useState, useEffect, useContext } from "react";
import Works from "./Works";
import UserContext from "./utils/UserContext";

const AuthForm = () => {

    const {user, setUser} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    const response = await fetch("http://localhost:3000/api/v1/isAuthenticated", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": `${token}`
                        },
                    });

                    if (response.ok) {
                        // Token is valid, set the user as authenticated
                        const data = await response.json();
                        setUser({
                            email: data.data.email,
                            id: data.data.id
                        });
                        setAuthenticated(true);
                    } else {
                        // Token is not valid, clear the token
                        setToken(null);
                        localStorage.removeItem("token");
                    }
                } catch (error) {
                    console.error("Error checking token validity:", error);
                }
            }
        };

        checkTokenValidity();
    }, [token]);

    const handleSignUp = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                localStorage.setItem("token", data.token);
            } else {
                // Handle signup error
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                setToken(data.data);
                localStorage.setItem("token", data.data);
            } else {
                // Handle signin error
                console.error("Signin failed");
            }
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    if (authenticated) {
        // Redirect to the home page or show a dashboard

        return <Works />;
    }

    return (
        <div className="reg">
            <div className="registration">
                <h2>Authentication</h2>
                <label>Email:</label>
                <input placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="buttons">
                    <button onClick={handleSignUp}>Sign Up</button>
                    <button onClick={handleSignIn}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
