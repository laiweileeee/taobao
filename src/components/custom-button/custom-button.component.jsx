import React from 'react';

import './custom-button.styles.scss';

//props.children refers to the value typed bwt the <button><>
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {
            isGoogleSignIn ? <i className="fab fa-google"></i> : children
        }
    </button>
)

export default CustomButton;