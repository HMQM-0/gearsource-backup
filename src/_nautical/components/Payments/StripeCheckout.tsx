/*
import { loadStripe } from '@stripe/stripe-js';
import * as React from 'react';
import ReactDOM from 'react-dom';

const createCheckoutSession() => {
    
}


interface IStripeCheckoutProps {

}

export const StripeCheckout: React.FC<IStripeCheckoutProps> = (props) => {
    const handleClick = async (event) => {
        // Call your backend to create the Checkout Session—see previous step
        const { sessionId } = await createCheckoutSession();
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
      };
      return (
        <button role="link" onClick={handleClick}>
          Checkout
        </button>
      );
};

export default StripeCheckout;
*/
