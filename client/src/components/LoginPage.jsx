import { useState } from 'react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData.username, formData.password);
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-username">Username:</label>
                    <input type='text' id='login-username' name='username' onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="login-password">Password:</label>
                    <input type='password' id='login-password' name='password' onChange={handleChange} required />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
};

export default LoginPage;
