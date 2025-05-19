import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';


const SignUpPage = () => {
    const { signup } = useAuth();

    const loadPersistedData = () => {

        const persistedDataString = localStorage.getItem('SignUpFormData');
        if (persistedDataString) {
            const persistedData = JSON.parse(persistedDataString);
            return persistedData;
        }

        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
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
        localStorage.setItem('SignUpFormData', JSON.stringify(data));
    }, []);


    useEffect(() => {
        if (Object.keys(watchedValues).length > 0) {
            saveToLocalStorage(watchedValues);
        }
    }, [watchedValues, saveToLocalStorage]);


    const onSubmit = async (data) => {
        let imageBase64 = "";
        if (data.image[0]) {
            const file = data.image[0];

            const convertToBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => resolve(fileReader.result);
                    fileReader.onerror = (error) => reject(error);
                });
            };

            imageBase64 = await convertToBase64(file);
        }
        const success = await signup(data.fullname, data.username, data.password, data.gender, data.email, imageBase64);
        console.log("after signup");
        if (success) {
            reset();
            localStorage.removeItem('SignUpFormData');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500'>
            <div className='bg-white p-8 min-w-lg rounded-lg shadow-lg w-full max-w-sm mx-auto'>
                <h2 className='text-4xl font-semibold mb-4 w-full text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                    <div>
                        <label htmlFor="signup-fullname" className="block mb-1 font-semibold">
                            Fullname:
                        </label>
                        <input
                            type="text"
                            id="signup-fullname"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            {...register('fullname', {
                                required: "Fullname is required",
                                minLength: { value: 2, message: "Fullname must be at least 2 characters" },
                                maxLength: { value: 30, message: "Fullname must be at most 30 characters" },
                            })}
                        />
                        {errors.fullname && <p className="mt-1 text-sm text-red-600">{errors.fullname.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="signup-email" className="block mb-1 font-semibold">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="signup-email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="signup-username" className="block mb-1 font-semibold">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="signup-username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            {...register('username', {
                                required: "Username is required",
                                minLength: { value: 5, message: "Username must be at least 5 characters" },
                                maxLength: { value: 15, message: "Username must be at most 15 characters" },
                            })}
                        />
                        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="signup-password" className="block mb-1 font-semibold">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="signup-password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must contain lowercase, uppercase, number & special char",
                                },
                            })}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="signup-confirm-password" className="block mb-1 font-semibold">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="signup-confirm-password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            {...register('confirmPassword', {
                                required: "Confirm Password is required",
                                validate: (value) => value === watch('password') || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="gender" className="block mb-1 font-semibold">
                            Gender:
                        </label>
                        <select
                            id="gender"
                            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            {...register('gender')}
                        >
                            <option value="" disabled>
                                Select your gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="image" className="mb-1 font-semibold">
                            Image:
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register('image')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-gray-50 cursor-pointer hover:bg-gray-100"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>

            </div>
        </div>
    );
};

export default SignUpPage;