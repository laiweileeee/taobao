import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    //stripe needs the price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H6AMrADrulwyU52Kjw5XX1qEC2Jqo25nDnauqUY9SUXt9HAuywWJJbcRIEsmdWrJ1noWXL6SLlom1IfoSuxP51u00yL9t2Gsb';
    const onToken = (token) => {
        console.log(token);
        alert('Payment Successful')
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="taobao lol."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton; 