import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../stripe.css";
import StripeCheckout from "../components/StripeCheckout";

//Load Stripe outside of components to avoid recreating stripe object on every render.
let publishable_key =
  "pk_test_51L48QVSDAviucxDZu2TtvbjVKFhPPKZD6RZ1ojHNkiNShkOVEDcMMRueB3L1j37K4kwN7gA2tK6DVhrtZBMQVCEm00Kp6Q7Ugy";

const promise = loadStripe(publishable_key);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h3>Complete Your Purchase</h3>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
