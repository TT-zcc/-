import React, { useState, useEffect } from 'react';
import { Input } from './login-register/form-input';
import { LoginRegisterButton as LoginButton } from './login-register/login-register-button';
import { Form as LoginForm } from './login-register/form';
import { MainBox as LoginMainBox } from './MainBox';
import { GoToRegister } from './login-register/GoToRegister';
import { useNavigate } from 'react-router-dom';
import PressEnter from './login-register/PressEnter';
import LoginSubmit from './login-register/LoginSubmit';

function Login () {
  // State management for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Get navigation functionality for routing
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('all_presentation', JSON.stringify([]));
  }, []);

  return (
    // Main container box for login component
    <LoginMainBox>
      {/* Login form */}
      <LoginForm onSubmit={(e) => LoginSubmit(e, email, password, navigate)}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // Listen for key press events on the input field. If Enter key is pressed
          onKeyDown={(e) => PressEnter(e, 'login', email, password, navigate, LoginSubmit)}
          />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // Listen for key press events on the input field. If Enter key is pressed
          onKeyDown={(e) => PressEnter(e, 'login', email, password, navigate, LoginSubmit)}
          />
        <LoginButton type="submit" variant="contained" color="primary">
          Submit
        </LoginButton>
        {/* Link to navigate to register page */}
        <GoToRegister to="/register">
          Go To Register
        </GoToRegister>
      </LoginForm>
    </LoginMainBox>
  );
}

export default Login;
