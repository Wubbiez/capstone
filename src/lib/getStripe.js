import {loadStripe} from '@stripe/stripe-js';

const getStripe = () => {
    if (!window.stripePromise) {
        window.stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    }
    return window.stripePromise;
}

export default getStripe;