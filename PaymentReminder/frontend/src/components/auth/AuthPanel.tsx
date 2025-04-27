import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthPanelProps {
  onAuthenticated?: (user: { email: string }) => void;
}

const AuthPanel: React.FC<AuthPanelProps> = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleLogin = (email: string, password: string, remember: boolean) => {
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        setNotification({
          type: 'success',
          message: 'Login successful! Redirecting...'
        });
        
        if (onAuthenticated) {
          setTimeout(() => {
            onAuthenticated({ email });
          }, 1500);
        }
      } else {
        setNotification({
          type: 'error',
          message: 'Invalid email or password'
        });
        
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    }, 800);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Account created successfully! Please log in.'
      });
      
      setTimeout(() => {
        setIsLogin(true);
        setNotification(null);
      }, 2000);
    }, 800);
  };

  const toggleAuthMode = () => {
    setNotification(null);
    
    const panel = document.getElementById('auth-panel');
    if (panel) {
      panel.classList.add('animate-flip');
      setTimeout(() => {
        setIsLogin(!isLogin);
        setTimeout(() => {
          panel.classList.remove('animate-flip');
        }, 50);
      }, 150);
    } else {
      setIsLogin(!isLogin);
    }
  };

  return (
    <div 
      id="auth-panel"
      className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out"
    >
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"></div>
        <div className="relative px-8 py-6 text-white">
          <h2 className="text-2xl font-bold transition-all duration-300">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 opacity-90">
            {isLogin 
              ? 'Sign in to access your account' 
              : 'Join us and start your journey'}
          </p>
        </div>
      </div>
      
      {notification && (
        <div 
          className={`px-6 py-3 flex items-center space-x-3 animate-fadeIn
            ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <p>{notification.message}</p>
        </div>
      )}
      
      <div className="p-8">
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={toggleAuthMode}
              className="ml-1 text-red-600 font-medium hover:text-red-800 transition-colors duration-200"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;