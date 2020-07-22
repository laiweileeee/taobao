import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';


import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';


//Dispatch action shorthand
const CartDropdown = ({ cartItems, history, dispatch }) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items" >
                {
                    cartItems.length
                        ?
                        cartItems.map(cartItem =>
                            <CartItem key={cartItem.id} item={cartItem} />)
                        :
                        <span className="empty-message">Your cart is empty</span>
                }
            </div>
                <CustomButton
                    onClick={() => {
                        history.push('/checkout');
                        // use this for simplified dispatching. No need for mapDispatchToPRops emthod
                        dispatch(toggleCartHidden());
                    }}>
                    GO TO CHECKOUT
                </CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => createStructuredSelector({
    //cartItems: state.cart.cartItems
    cartItems: selectCartItems
})

// 'connect' automatically passes the dispatch as a prop we can access 
export default withRouter(connect(mapStateToProps)(CartDropdown));