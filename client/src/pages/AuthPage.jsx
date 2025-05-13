import React, { useState } from 'react';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';

const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    const switchToSignup = () => setShowLogin(false);
    const switchToLogin = () => setShowLogin(true);

    return (
        <div>
            <h1>Authentication</h1>
            {showLogin ? (
                <LoginPage onSwitchToSignup={switchToSignup} />
            ) : (
                <SignupPage onSwitchToLogin={switchToLogin} />
            )}
        </div>
    );
};

export default AuthPage;