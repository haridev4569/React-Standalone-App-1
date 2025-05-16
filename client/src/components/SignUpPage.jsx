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
        if(data.image[0]){
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
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="signup-fullname">Fullname:</label>
                    <input
                        type="text"
                        id="signup-fullname"
                        {...register('fullname', {
                            required: "Fullname is required",
                            minLength: { value: 2, message: "Fullname must be at least 2 characters" },
                            maxLength: { value: 30, message: "Fullname must be at most 30 characters" },
                        })}
                    />
                    {errors.fullname && <p>{errors.fullname.message}</p>}
                </div>
                <div>
                    <label htmlFor="signup-email">Email:</label>
                    <input
                        type="email"
                        id="signup-email"
                        {...register('email', {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="signup-username">Username:</label>
                    <input
                        type="text"
                        id="signup-username"
                        name="username"
                        {...register('username', {
                            required: "Username is required",
                            minLength: { value: 5, message: "Username must be at least 5 characters" },
                            maxLength: { value: 15, message: "Username must be at most 15 characters" },
                        })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="signup-password">Password:</label>
                    <input
                        type="password"
                        id="signup-password"
                        name="password"
                        {...register('password', {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                            }
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="signup-confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="signup-confirm-password"
                        name="confirmPassword"
                        {...register('confirmPassword', {
                            required: "Confirm Password is required",
                            validate: (value) => value === watch('password') || "Passwords do not match",
                        })}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        {...register('gender')}
                    >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p>{errors.gender.message}</p>}
                </div>

                <div>
                    <label htmlFor='image'>Image:</label>
                    <input
                        type='file'
                        id='image'
                        {...register('image')}
                    />
                </div>

                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account?{' '}
                <Link to='/login'>Login</Link>
            </p>
        </div>
    );
};

export default SignUpPage;