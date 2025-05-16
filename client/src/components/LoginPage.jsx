import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

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
        defaultValues: loadPersistedData(),
        mode: 'onTouched'
    });

    const watchedValues = watch();

    const saveToLocalStorage = useCallback((data) => {
        localStorage.setItem('LoginForm', JSON.stringify(data));
    }, []);

    useEffect(() => {
        if (Object.keys(watchedValues).length > 0) {
            saveToLocalStorage(watchedValues);
        }
    }, [watchedValues, saveToLocalStorage]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const success = await login(data.username, data.password);
        setIsLoading(false);
        if (success) {
            reset();
            localStorage.removeItem('LoginForm');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="login-username">Username:</label>
                    <input type='text' id='login-username' {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 5,
                            message: 'Username must be at least 5 characters long'
                        },
                        maxLength: {
                            value: 15,
                            message: 'Username must be at most 15 characters long'
                        }
                    })} />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="login-password">Password:</label>
                    <input type='password' id='login-password' {...register('password', {
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                        }
                    })} />
                    {errors.password && <p>{errors.password.message}</p>}
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
