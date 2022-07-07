import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingToRedirect from "../components/LoadingToRedirect";
import {
  applyCoupon,
  createCashOrderForUser,
  emptyUserCart,
  saveUserAddress,
} from "../functions/user";
import { AddToCart } from "../reducers/cartReducer";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { couponApplied } from "../reducers/couponReducer";
import { useNavigate } from "react-router-dom";
import { codApplied } from "../reducers/CodReducer";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  let token = user.currentUser.authToken;
  let userOK = user.currentUser;

  const getUserCart = async (token) => {
    await axios
      .get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log("User Cart RES", JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
        // console.log(products);
      });
  };

  useEffect(() => {
    getUserCart(token);
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch(AddToCart([]));

    // remove from backend
    emptyUserCart(token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Contniue shopping.");
    });
  };

  const applyDiscountCoupon = () => {
    // console.log("Send coupon to backend", coupon);
    applyCoupon(token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // Update Redux Coupon Applied
        dispatch(couponApplied(true));
      }
      //ERROR
      if (res.data.err) {
        setDiscountError(res.data.err);
        // Update Redux Coupon Applied
        dispatch(couponApplied(false));
      }
    });
  };

  const saveAddressToDB = () => {
    // console.log(address);
    saveUserAddress(token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved!");
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-dark mt-2 mx-3 w-25" onClick={saveAddressToDB}>
        Save Address
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control mx-2 w-75"
      />
      <button
        className="btn btn-outline-dark mt-2 mx-2 w-25"
        onClick={applyDiscountCoupon}
      >
        Apply Coupon
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED!", res.data);
      // empty cart  from redux, local storage, reset coupon,  reset COD, redirect
      if (res.data.ok) {
        // Empty LocalStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }

        // Empty Redux Cart
        dispatch(AddToCart([]));

        //Empty Redux Coupon
        dispatch(couponApplied(false));

        // Empty Redux COD
        dispatch(codApplied(false));

        // Empty Cart From Backend
        emptyUserCart(token);

        // Redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 2000);
      }
    });
  };

  return (
    <>
      {userOK ? (
        <div className="row">
          <div className="col-md-6">
            <h3 className="mx-4">Delivery Address</h3>
            {showAddress()}
            <hr />
            <h3 className="mx-2">Got a Coupon ?</h3>
            {showApplyCoupon()}
            {discountError && (
              <div
                class="alert alert-danger mt-2 mx-2 d-flex align-items-center"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>{discountError}</div>
              </div>
            )}
            <hr />
          </div>

          <div className="col-md-6">
            <h4>Order Summary</h4>
            <hr />
            <p>Products / {products.length}</p>
            <hr />
            {showProductSummary()}
            <hr />
            <p>Cart Total: ${total}</p>
            {totalAfterDiscount > 0 && (
              <div className="bg-success bg-opacity-75 p-1 mb-3">
                <p>Discount applied!!</p>
                <p>
                  <strong>Total Payable:</strong> $ {totalAfterDiscount}
                </p>
              </div>
            )}
            <div className="row">
              <div className="col-md-6">
                {COD.codApply ? (
                  <button
                    className="btn btn-outline-dark mx-3"
                    disabled={!addressSaved || !products.length}
                    onClick={createCashOrder}
                  >
                    Place Order
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark mx-3"
                    disabled={!addressSaved || !products.length}
                    onClick={() => navigate("/payment")}
                  >
                    Place Order
                  </button>
                )}
                <button
                  className="btn btn-outline-dark"
                  onClick={emptyCart}
                  disabled={!products.length}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default Checkout;
