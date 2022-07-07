import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import LoadingToRedirect from "../../../components/LoadingToRedirect";
import AdminNav from "../../../components/nav/AdminNav";
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../functions/coupon";
import Loader from "../../../components/Loader";
import axios from "axios";

const CreateCouponPage = () => {
  const role = localStorage.getItem("role");
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  // REDUX
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.currentUser.authToken;

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    await axios.get(`${process.env.REACT_APP_API}/coupons`).then((res) => {
      setCoupons(res.data);
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name, expiry, discount);
    createCoupon({ name, expiry, discount }, token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setDiscount("");
        getCoupons();
        toast.success(`"${name}" is created!`);
      })
      .catch((err) => console.log("Create Coupon Failed!", err));
  };

  const handleRemove = (couponId) => {
    setLoading(true);
    if (window.confirm("Do you want to Delete this Coupon ?")) {
      removeCoupon(couponId, token)
        .then((res) => {
          getCoupons();
          setLoading(false);
          toast.error(`"${res.data.name}" Deleted ! `);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-fluid">
      {role === "admin" ? (
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            {loading ? <Loader /> : <h3>Coupon</h3>}

            <form onSubmit={handleSubmit} className="w-75">
              <div className="form-group">
                <label className="text-muted mb-2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-muted mb-2">Discount %</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                />
              </div>

              <div className="form-group w-50">
                <label className="text-muted mb-2">Expiry</label>
                <DatePicker
                  className="form-control"
                  selected={expiry}
                  value={expiry}
                  onChange={(date) => setExpiry(date)}
                  required
                />
              </div>

              <button className="btn btn-dark mt-3 w-25">Save Coupon</button>
            </form>

            <br />
            <h4>{coupons.length} Coupons</h4>

            <table className="table table-bordered table-light w-75">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Expiry</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                    <td>{c.discount} %</td>
                    <td>
                      <DeleteOutlined
                        onClick={() => handleRemove(c._id)}
                        className="text-danger pointer-event"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <LoadingToRedirect />
      )}
    </div>
  );
};

export default CreateCouponPage;
