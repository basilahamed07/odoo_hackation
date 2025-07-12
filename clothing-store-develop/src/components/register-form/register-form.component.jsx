import { useCallback, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { createUserWithEmailPwd, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

// Create an object with the form fields names and empty initial value, only one generic useState can be used
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const RegisterForm = () => {
  // define the form fields useState passing the object
  const [formFields, setFormFields] = useState(defaultFormFields);
  // Destructure the passed object above to have their values as variables
  const { displayName, email, password, confirmPassword } = formFields;

  const clearForm = useCallback(() => {
    setFormFields(defaultFormFields);
  }, []);


 const register = () => {
    const existingList = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const updatedList = [...existingList, formFields];

    localStorage.setItem('registeredUsers', JSON.stringify(updatedList));

    alert('User registered!');
    setFormFields(defaultFormFields); // reset form
  };

  // Basic function called by the inputs onChange event
  const handleChange = (event) => {
    // Destructure the 2 needed values comming from event.target
    const { name, value } = event.target;

    // Call the useState to update the specific field value.
    // Remember to {...formFields } as this is an OBJECT, you don't want to lose the other fields key-value pairs.
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='register-container'>
      <h2>Don&apos;t have an account?</h2>
      <span>Register filling the information below.</span>
      <form onSubmit={register}>
          {/* set each field value to the destructured values from the top */}

        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          onChange={handleChange}
          value={displayName} required
        />
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
        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          onChange={handleChange}
          value={confirmPassword} required
        />
        <div>
          <Button type='submit' style=''  label='Register' />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
