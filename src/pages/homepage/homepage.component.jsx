import React from 'react';
import { withRouter } from 'react'

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

const HomePage = () => {
    return (
        <div className="homepage">
            <Directory />
        </div>
    )
};

export default HomePage;