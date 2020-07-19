import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

//HIGHER ORDER COMPONENT HOC
//Takes in an object with the isLoading prop to decide to render spinner or not
const WithSpinner = (WrappedComponent) => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
                <WrappedComponent {...otherProps} />
            )
    }
    return Spinner;
};

export default WithSpinner;