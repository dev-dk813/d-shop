import React from "react";
import { Drawer } from "antd";
import noImg from "../../images/noimage1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../../reducers/drawerReducer";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  let Cart = cart.userCart;
  let visibility = drawer.visibility;

  const imageStyle = {
    width: "100%",
    height: "60%",
    objectFit: "cover",
  };
  return (
    <Drawer
      className="text-center"
      title={`Cart / ${Cart.length} Product`}
      placement="right"
      onClose={() => {
        dispatch(setVisible(false));
      }}
      visible={visibility}
    >
      {Cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} alt="IMG" style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={noImg} alt="NoIMG" style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link className="d-grid" to="/cart">
        <button
          className="btn btn-outline-dark btn-block text-center"
          onClick={() => dispatch(setVisible(false))}
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
