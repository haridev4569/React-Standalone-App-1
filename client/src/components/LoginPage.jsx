import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = ({ onSwitchToSignup }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { login, setIsLoading } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await login(formData.username, formData.password);
        setIsLoading(false);
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-username">Username:</label>
                    <input type='text' id='login-username' name='username'
                        value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="login-password">Password:</label>
                    <input type='password' id='login-password' name='password' value={formData.password} onChange={handleChange} required />
                </div>

                <button type='submit'>Login</button>
            </form>
            <p>
                Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
        </div>
    )
};

export default LoginPage;
