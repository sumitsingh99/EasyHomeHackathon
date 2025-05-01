import React, { useState } from 'react';
import LoginInput from './LoginInput';
import Button from './Button';
import { signup } from '../../services/authService'; // Import signup API

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const [loading, setLoading] = useState(false);
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
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
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        const response = await signup(formData); // Call signup API
        console.log('User registered:', response);
        onSubmit(formData.name, formData.email, formData.password); // Notify parent component
      } catch (error) {
        console.error('Signup failed:', error);
        alert(error); // Display error to the user
      } finally {
        setLoading(false);
      }
    } else {
      // Apply subtle shake animation to the form
      const form = document.getElementById('register-form');
      if (form) {
        form.classList.add('animate-shake');
        setTimeout(() => {
          form.classList.remove('animate-shake');
        }, 500);
      }
    }
  };
  
  return (
    <form id="register-form" onSubmit={handleSubmit} className="space-y-5">
      <LoginInput
        id="name"
        type="text"
        label="Full Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
      />
      
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
        autoComplete="new-password"
      />
      
      <LoginInput
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />
      
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        loading={loading}
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;