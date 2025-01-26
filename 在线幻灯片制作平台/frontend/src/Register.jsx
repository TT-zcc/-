import React, { useState, useEffect } from 'react';
import { Input } from './login-register/form-input';
import { LoginRegisterButton as RegisterButton } from './login-register/login-register-button';
import { Form as RegisterForm } from './login-register/form';
import { MainBox as RegisterMainBox } from './MainBox';
import { useNavigate } from 'react-router-dom';
import PressEnter from './login-register/PressEnter';
import RegisterSubmit from './login-register/RegisterSubmit';

function Register () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();// Used for navigating within the component

  useEffect(() => {
    localStorage.setItem('all_presentation', JSON.stringify([]));
  }, []);

  return (
    <RegisterMainBox>
      <RegisterForm onSubmit={(e) => RegisterSubmit(e, email, password, navigate, name, confirmPassword)}>
        {/* Input for email */}
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => PressEnter(e, 'register', email, password, navigate, RegisterSubmit, name, confirmPassword)}
        />
        {/* Input for password */}
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => PressEnter(e, 'register', email, password, navigate, RegisterSubmit, name, confirmPassword)}
        />
        {/* Input for name */}
        <Input
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => PressEnter(e, 'register', email, password, navigate, RegisterSubmit, name, confirmPassword)}
        />
        {/* Input to confirm password */}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={(e) => PressEnter(e, 'register', email, password, navigate, RegisterSubmit, name, confirmPassword)}
        />
        {/* Button to submit the form */}
        <RegisterButton type="submit" variant="contained" color="primary">
          Submit
        </RegisterButton>
      </RegisterForm>
    </RegisterMainBox>
  );
}

export default Register;
