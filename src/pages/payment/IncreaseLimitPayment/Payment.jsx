import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm copy";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Payment = ({ price }) => {
  console.log(price);
  return (
    <div>
      <Elements stripe={stripePromise}>
        {/* <CheckoutForm></CheckoutForm> */}
      </Elements>
    </div>
  );
};

export default Payment;
