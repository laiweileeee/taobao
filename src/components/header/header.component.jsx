import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.util';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => {
    return (
        <div className="header">

            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>

            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/shop">
                    CONTACT
                </Link>
                {
                    currentUser ?
                        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link className="option" to="/signin">
                            SIGN IN
                        </Link>
                }
            </div>
        </div>
    )
}

//state refers to the root reducer
// ** This will be used anywhere we need properties from reducers
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

//connect to pass the value from the reducer to the component 
export default connect(mapStateToProps)(Header);