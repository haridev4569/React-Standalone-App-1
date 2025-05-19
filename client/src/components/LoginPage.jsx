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
        <div className='flex items-center min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto'>
                <h2 className='text-4xl font-semibold mb-4 w-full text-center'>Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md" >
                    <div className="mb-4">
                        <label htmlFor="login-username" className="block mb-1 font-medium">
                            Username
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            {...register("username", {
                                required: "Username is required",
                                minLength: { value: 5, message: "At least 5 characters" },
                                maxLength: { value: 15, message: "At most 15 characters" },
                            })}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="login-password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "At least 8 characters" },
                                pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Lower, upper, number & special character required",
                                },
                            })}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                    >
                        Login
                    </button>

                    <p className="mt-4 text-center text-sm">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default LoginPage;
