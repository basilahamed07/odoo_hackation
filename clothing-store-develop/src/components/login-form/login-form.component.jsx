import { useCallback, useState } from 'react';
import {
  signInWithGooglePopup,
  loginUserWithEmailPwd
} from '../../utils/firebase/firebase.utils.js';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from "../../store/user.reducer.js"; // adjust path as needed
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  email: '',
  password: ''
}

const LoginForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearForm = useCallback(() => {
    setFormFields(defaultFormFields);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await signInWithGooglePopup();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
          dispatch(setCurrentUser('logged-in'));

      alert(`Welcome back, ${foundUser.displayName}!`);
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
navigate("/shop");
      // You could navigate or set login state here
    } else {
      alert('Invalid email or password.');
      clearForm();
    }








  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='login-container'>
      <h2>I already have an account</h2>
      <span>Login with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='text'
          name='email'
          onChange={handleChange}
          value={email} required
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          onChange={handleChange}
          value={password} required
        />
        <div className='buttons-wrapper'>
          <Button type='submit' style='' label='Login' />
          <Button
            onClick={loginWithGoogle}
            type='button'
            style='google-sign-in'
            label='Login with Google'
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
