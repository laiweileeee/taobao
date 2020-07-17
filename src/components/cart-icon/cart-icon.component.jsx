import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent  as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
)

//dispatch action object - toggleCartHidden() to the cart reducer 
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = (state) => ({
    //using reduce to accumulate the quantity number, starting from 0
    // This is a selector, pulling of a slice of the state, and reducing it to get a new output 
    // Bad performance, the selector will always be called and processed even if unrelated state is updated. 
    // Solution is to cache, memoize data so that if the data is the same, there is no need to re compute
    // React library re-selector solves this
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);