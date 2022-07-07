import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingToRedirect from "../../components/LoadingToRedirect";
import UserNav from "../../components/nav/UserNav";
import { removeWishlist } from "../../functions/user";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const User = user.currentUser;
  const token = user.currentUser.authToken;

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist(token);
  }, [token]);

  const getWishlist = async (token) => {
    await axios
      .get(`${process.env.REACT_APP_API}/user/wishlist`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        // console.log(res.data.wishlist);
        setWishlist(res.data.wishlist);
      });
  };

  const handleRemove = (productId) => {
    removeWishlist(productId, token).then((res) => {
      getWishlist(token);
    });
  };

  return (
    <div className="container-fluid">
      {User ? (
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col">
            <h3>Wishlist</h3>

            {wishlist.map((p) => (
              <div key={p._id} className="alert alert-secondary">
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                  className="btn btn-sm float-end"
                  onClick={() => handleRemove(p._id)}
                >
                  <DeleteOutlined className="text-danger" />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingToRedirect />
      )}
    </div>
  );
};

export default Wishlist;
