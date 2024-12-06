import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(e) {
        e.preventDefault(); 

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Registration Successful");
            })
            .catch((error) => {
                console.log("Error:", error.message);
                alert(error.message);  
            });
    }

    return (
        <div className='main'>
            <h1>Register</h1> <br />

            <form onSubmit={handleRegister}>
                <label htmlFor="email">Email: </label>&nbsp;&nbsp;
                <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> <br /><br />

                <label htmlFor="password">Password: </label>&nbsp;&nbsp;
                <input
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br /><br />

                <button type="submit">Register</button>
            </form>

            <div className="login-link">
                <p>Already have an account? <Link to="/">Login here</Link></p>
            </div>
        </div>
    );
}
