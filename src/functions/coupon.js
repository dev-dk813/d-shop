import axios from "axios";
// let SERVER_URL = "http://localhost:8000/api";

export const getCoupons = async () => {
  await axios.get(`${process.env.REACT_APP_API}/coupons`);
};

export const removeCoupon = async (couponId, token) => {
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      token,
    },
  });
};

export const createCoupon = async (coupon, token) => {
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        token,
      },
    }
  );
};