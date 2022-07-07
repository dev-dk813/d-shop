import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { createOrder, emptyUserCart } from "../functions/user";
import { AddToCart } from "../reducers/cartReducer";
import { couponApplied } from "../reducers/couponReducer";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));
  const token = user.currentUser.authToken;
  const Coupon = coupon.couponApp;

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(token, Coupon).then((res) => {
      console.log("CREATE PAYMENT INTENT", res.data);
      setClientSecret(res.data.clientSecret);
      // Addition Response recieved on successFull Payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
      setProcessing(true);
    } else {
      // Create Order and save in database for admin to process
      createOrder(payload, token).then((res) => {
        if (res.data.ok) {
          // Empty cart from LocalStorage
          if (typeof window !== "undefined") localStorage.removeItem("cart");

          // Empty Cart from Redux-Store
          dispatch(AddToCart([]));

          // Reset Coupon to False
          dispatch(couponApplied(false));

          // Empty cart from DataBase
          emptyUserCart(token);
        }
      });

      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // Listen for changes in the cart element
    // Display any errors as the customer types their card details
    setDisabled(e.empty); //Disable Pay button if errors
    setError(e.error ? e.error.message : ""); //Show error message
  };
  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">
              {`Wooho! Coupon Applied! Total after Discount: Rs- ${totalAfterDiscount}`}{" "}
              !
            </p>
          ) : (
            <p className="alert alert-danger">No Coupon Applied !</p>
          )}
        </div>
      )}

      <div className="text-center pb-4">
        <Card
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: Rs-\{" "}
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total Payable: Rs-\
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" onSubmit={handleSubmit}>
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful !{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>

        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />

        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}

        <button
          className="stripe-button mt-3"
          disabled={processing || succeeded || disabled}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay Now"
            )}
          </span>
        </button>
      </form>
    </>
  );
};

export default StripeCheckout;
