import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignupPage = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    })
    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullname, email, username, password, confirmPassword, gender } = formData;
        if (!username || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const success = signup(username, password);
        if (success) {
            onSwitchToLogin();
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="signup-fullname">Fullname:</label>
                    <input
                        type="text"
                        id="signup-fullname"
                        value={fullname}
                        onChange={(e) => setFormData.fullname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-email">Email:</label>
                    <input
                        type="text"
                        id="signup-email"
                        value={email}
                        onChange={(e) => setFormData.email(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-username">Username:</label>
                    <input
                        type="text"
                        id="signup-username"
                        value={username}
                        onChange={(e) => setFormData.username(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-password">Password:</label>
                    <input
                        type="password"
                        id="signup-password"
                        value={password}
                        onChange={(e) => setFormData.password(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="signup-confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setFormData.confirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender} 
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account?{' '}
                <button type="button" onClick={onSwitchToLogin}>
                    Login
                </button>
            </p>
        </div>
    );
};

export default SignupPage;