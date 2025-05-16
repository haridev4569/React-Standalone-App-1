import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../context/LoginFormContext';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const { login, setIsLoading } = useAuth();

    const loadPersistedData = () => {

        const persistedDataString = localStorage.getItem('LoginForm');
        if (persistedDataString) {
            const persistedData = JSON.parse(persistedDataString);
            return persistedData;
        }
        return {
            username: '',
            password: '',
        };
    };


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {

        },
        mode: 'onTouched'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData(name, value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await login(formData.username, formData.password);
        setIsLoading(false);
        clearForm();
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
