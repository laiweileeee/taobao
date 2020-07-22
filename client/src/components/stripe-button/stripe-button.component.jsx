import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    //stripe needs the price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H6AMrADrulwyU52Kjw5XX1qEC2Jqo25nDnauqUY9SUXt9HAuywWJJbcRIEsmdWrJ1noWXL6SLlom1IfoSuxP51u00yL9t2Gsb';
   
    // pass token to our back end 
    const onToken = (token) => {
        console.log(token);
        //Similar to .fetch that we know!
        axios({
            //append '/payment' to whatever url we are at, and make a request to it
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('Payment SUCCESSS!! WEEeeEEeeEeeEEEEeee')
        }).catch(error => {
            console.log('Payment error: ', error);
            alert('There was an issue with your payment, Please make sure you use the provided credit card');
        });
    };

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