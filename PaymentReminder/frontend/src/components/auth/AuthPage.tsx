import React from 'react';
import AuthPanel from './AuthPanel';
import { signin } from '../../services/authService'; // Import signin API
import logo from '../../public/images/easy-home-logo.jpeg'; // Adjust the path as necessary

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const handleAuthenticated = async (email: string, password: string) => {
    try {
      const response = await signin({ email, password });
      console.log('User authenticated:', response);
      onLoginSuccess(); // Notify parent component of successful login
    } catch (error) {
      console.error('Login failed:', error);
      alert(error); // Display error to the user
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-red-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl">
        {/* Background design elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-red-600 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative flex flex-col md:flex-row">
          {/* Left panel - Branding */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-l-2xl w-2/5">
            <div className="animate-fadeIn">
              <div className="mb-8">
                <img 
                  src={logo} 
                  alt="EasyHome Logo" 
                  className="w-48"
                />
              </div>
              <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
              <p className="mb-8 opacity-90">
                Access your EasyHome account to manage your rentals and payments in one place.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="mt-1">✓</span>
                  <p>View your rental agreements</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="mt-1">✓</span>
                  <p>Make payments easily online</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="mt-1">✓</span>
                  <p>Browse new products and offers</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right panel - Auth form */}
          <div className="flex items-center justify-center w-full md:w-3/5">
            <AuthPanel onSubmit={handleAuthenticated} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;