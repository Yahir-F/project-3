import React, { useState } from 'react';
import Auth from '../utils/auth';
import { createUser } from '../utils/api';

const SignupForm = (props) => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('')
    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const response = await createUser(formState);
            const data = await response.json();
            if(!response.ok){
              setErrorMessage(data.message)
              console.log(data)
              return;
            }
            Auth.login(data.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            username: '',
            password: '',
        });
    };
    return (

        <div className="sign-form">
            <h2>Sign Up</h2>
            <p>{errorMessage}</p>
            <form onSubmit={handleFormSubmit}>
                <input
                    className='form-input'
                    placeholder="email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    placeholder="username"
                    type="text"
                    name='username'
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    placeholder="password"
                    type="password"
                    name='password'
                    value={formState.password}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn">SignUp</button>
            </form>
        </div>
    );
};

export default SignupForm;