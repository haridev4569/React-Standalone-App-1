import { useState, useEffect, useContext, createContext } from 'react';

const LoginFormContext = createContext();

export const useLoginForm = () => {
    return useContext(LoginFormContext);
}

export const LoginFormProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        const storedData = localStorage.getItem('LoginForm');
        return storedData ? JSON.parse(storedData) : {
            email: '',
            password: '',
        };
    });

    useEffect(() => {
        localStorage.setItem('LoginForm', JSON.stringify(formData));
    }, [formData]);

    const updateFormData = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    }

    const clearForm = () => {
        setFormData({
            email: '',
            password: '',
        });
        localStorage.removeItem('LoginForm');
    }

    const LoginContextValue = {
        formData,
        updateFormData,
        clearForm,
    }

    return (
        <LoginFormContext.Provider value={LoginContextValue} >
            {children}
        </LoginFormContext.Provider>
    )
};
