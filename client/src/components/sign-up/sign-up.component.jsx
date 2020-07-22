import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.util';

import './sign-up.styles.scss';

//Applying hooks
const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //destructure from userCredentials(hooks)
    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Check for same password
        if (password !== confirmPassword) {
            alert("passwords don't match")
            //break from function
            return;
        }
        //Create profile in firebase and set state
        try {
            //create user, get back userAuth object
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            //await creation
            await createUserProfileDocument(user, { displayName });
            //clear form
            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            //display error message for users
            // console.log(error);
            if (error.message) {
                alert(error.message);
            }
        }
    };

    // One function for both email and password handling
    const handleChange = (event) => {
        const { value, name } = event.target;

        // short hand for if - else 
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span className="title">Sign up with your email and password</span>

            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    name="displayName"
                    type="text"
                    value={displayName}
                    handleChange={handleChange}
                    label="Display Name"
                    required />
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    handleChange={handleChange}
                    label="Email"
                    required />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Password"
                    required />
                <FormInput
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    handleChange={handleChange}
                    label="Confirm Password"
                    required />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>
    )

}

export default SignUp;