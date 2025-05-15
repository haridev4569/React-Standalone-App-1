import { useState, useEffect, useContext, createContext } from 'react';

const SignUpFormContext = createContext();

export const useSignUpForm = () => {
  return useContext(SignUpFormContext);
}

export const SignUpFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem('SignUpFormData');
    return storedData ? JSON.parse(storedData) : {
      fullname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('SignUpFormData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  }

  const clearForm = () => {
    setFormData({
      fullname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
    });
    localStorage.removeItem('SignUpFormData');
  }

  const contextValue = {
    formData,
    updateFormData,
    clearForm,
  };

  return (
    <SignUpFormContext.Provider value={contextValue}>
      {children}
    </SignUpFormContext.Provider>
  );
}