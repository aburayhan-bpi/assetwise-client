import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Payment = ({ newPackage }) => {
  // console.log(price);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm newPackage={newPackage}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
