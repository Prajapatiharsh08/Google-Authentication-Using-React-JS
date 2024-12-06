import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { Link } from 'react-router-dom';  
import './Login.css'

const auth = getAuth(app);

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const EmailLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Login Successful');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                alert("Please Register First...")
            });
    };

    const GoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessqToken;
                const user = result.user;
                console.log('User Info:', user);
                console.log('Token:', token);
                setLoginMessage('Login Successful with Google!');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Log-In Form</h2>
            <div className="login-form-box">
                <form onSubmit={EmailLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        /> <br />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="login-button">Log in</button>
                </form>

                <div className="google-login">
                    <button onClick={GoogleLogin} className="google-button">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                            alt="Google logo"
                            className="google-logo"
                        />
                        Log in with Google
                    </button>
                </div> <br />

                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </div>

            {loginMessage && <p className="success-message">{loginMessage}</p>}
        </div>
    );
}
