import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignUpPage = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });
    const { signup } = useAuth(); 

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullname, email, username, password, confirmPassword, gender } = formData;

        if (!fullname || !email || !username || !password || !confirmPassword || !gender) {
            alert('Please fill in all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const success = await signup(fullname, username, password, gender, email); 
        if (success) {
            alert('Signup successful! Please log in.'); 
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
                        name="fullname" 
                        value={formData.fullname} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-email">Email:</label>
                    <input
                        type="email" 
                        id="signup-email"
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-username">Username:</label>
                    <input
                        type="text"
                        id="signup-username"
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-password">Password:</label>
                    <input
                        type="password"
                        id="signup-password"
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="signup-confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="signup-confirm-password"
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
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
                        <option value="other">Other</option> 
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

export default SignUpPage;