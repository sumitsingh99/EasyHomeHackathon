import React, { useState, useRef, useEffect } from 'react';

interface LoginInputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  autoComplete?: string;
}

const LoginInput: React.FC<LoginInputProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  error,
  onFocus,
  onBlur,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isFloating = focused || value.length > 0;
  const actualType = type === 'password' ? (passwordVisible ? 'text' : 'password') : type;

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.classList.add('animate-shake');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.classList.remove('animate-shake');
        }
      }, 500);
    }
  }, [error]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) onBlur();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <div className="relative w-full mb-5">
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={id} // Ensure name is passed
          type={actualType}
          value={value}
          onChange={onChange} // Ensure onChange is passed
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          className={`
            w-full bg-white px-4 py-3 rounded-xl
            border transition-all duration-300 ease-out
            text-gray-800 placeholder-transparent
            focus:outline-none focus:ring-2
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-red-200 focus:border-red-400'}
            ${focused ? 'border-red-400' : ''}
          `}
          placeholder={label}
        />
        
        <label
          htmlFor={id}
          className={`
            absolute left-4 pointer-events-none
            transition-all duration-300 ease-out
            ${isFloating ? 'text-xs text-red-600 -translate-y-6' : 'text-gray-500 translate-y-1/2'}
          `}
        >
          {label}
        </label>
        
        {type === 'password' && value.length > 0 && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 transition-all duration-300 ease-in-out">{error}</p>
      )}
    </div>
  );
};

export default LoginInput;