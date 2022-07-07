import axios from "axios";

// let SERVER_URL = "http://localhost:8000/api";

export const createPaymentIntent = async (token, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        token,
      },
    }
  );
