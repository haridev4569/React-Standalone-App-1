import { useState, useEffect, useContext, createContext } from 'react';
import { useForm } from 'react-hook-form';

const SignUpFormContext = createContext();

export const useSignUpForm = () => {
  return useContext(SignUpFormContext);
}

export const SignUpFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('SignUpFormData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
    else{
      console.log("No signup form data found in local storage");
    }
  }, []);

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