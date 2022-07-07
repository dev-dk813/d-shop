import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { cartUser } from "../functions/user";
import { codApplied } from "../reducers/CodReducer";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  let User = user.currentUser;
  let UserCart = cart.userCart;
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(token);

  const getTotal = () => {
    return UserCart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDB = () => {
    // console.log("Cart", JSON.stringify(UserCart, null, 4));
    cartUser(UserCart, token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log("CART SAVE ERR", err));
  };

  const showCartItems = () => (
    <table className="table table-light table-striped table-bordered">
      <thead className="table-dark opacity-75">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {UserCart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const saveCashOrderToDB = () => {
    // console.log("Cart", JSON.stringify(UserCart, null, 4));
    dispatch(codApplied(true));

    cartUser(UserCart, token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log("CART SAVE ERR", err));
  };
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {UserCart.length} Product</h4>
          {!UserCart.length ? (
            <p>
              No Products in Cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {UserCart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = $ {c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <strong>${getTotal()}</strong>
          <hr />
          {User ? (
            <>
              <button
                onClick={saveOrderToDB}
                className="btn btn btn-dark mt-2"
                disabled={!UserCart.length}
              >
                Proceed To Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDB}
                className="btn btn btn-secondary px-3 mt-2"
                disabled={!UserCart.length}
              >
                Cash On Delivery
              </button>
            </>
          ) : (
            <div className="d-grid">
              <button className="btn btn-dark btn-block mt-2">
                <Link
                  className="text-light"
                  to={"/login"}
                  state={{ from: "/cart" }}
                >
                  Login To Checkout
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
