import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";


const stripePromise = loadStripe(
  "pk_test_51IfrX7KVo8iUM2TEvfIp9QpKlJuCXOZtTvxQ9rGPZDg8M9WAYMumkZ644dLsemBUD0PWQzKIDTq7aO1IsaUPePnE00rPKz7HJc"
);
const ProcessPayment = ({handlePayment}) => {
    return (
      <Elements stripe={stripePromise}>
        <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
      </Elements>
    );
};

export default ProcessPayment;
