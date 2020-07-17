import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.util';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => {
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
                <CartIcon />
            </div>
            {
                hidden ? null :
                <CartDropdown />
            }
        </div>
    )
}

//state refers to the root reducer
// ** This will be used anywhere we need properties from reducers
//** destructuring user and cart of of 'state' in the parameter
const mapStateToProps = (state) => createStructuredSelector({
    // Previously was currentUser: state.user.currentUser OR currentUser: selectCurrentUser(state), 
    // but createStructuredSelector helps us automatically pass in the state to the reselectors
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

//connect to pass the value from the reducer to the component 
export default connect(mapStateToProps)(Header);