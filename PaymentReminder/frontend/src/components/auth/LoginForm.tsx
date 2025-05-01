import React, { useState } from 'react';
import LoginInput from './LoginInput';
import Button from './Button';

interface LoginFormProps {
  onSubmit: (email: string, password: string, remember: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  const [loading, setLoading] = useState(false);
  
  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    console.log(`Input changed: ${name} = ${type === 'checkbox' ? checked : value}`); // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Submit the form
      onSubmit(formData.email, formData.password, formData.remember);
      
      // Reset loading state after 2 seconds if not redirected
      // Reset loading state after 2 seconds if not redirected
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      // Apply subtle shake animation to the form
      const form = document.getElementById('login-form');
      if (form) {
        form.classList.add('animate-shake');
        setTimeout(() => {
          form.classList.remove('animate-shake');
        }, 500);
      }
    }
  };
  
  return (
    <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
      <LoginInput
        id="email"
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />
      
      <LoginInput
        id="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />
      
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        
        <a 
          href="#" 
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Forgot password?
        </a>
      </div>
      
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        loading={loading}
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;