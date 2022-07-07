import React, { useEffect, useState } from "react";
import LoadingToRedirect from "../../components/LoadingToRedirect";
import AdminNav from "../../components/nav/AdminNav";
import { changeStatus, getOrders } from "../../functions/admin";
import { currentAdmin } from "../../functions/auth";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  let SERVER_URL = "http://localhost:8000/api";
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.currentUser.authToken;

  const [ok, setOk] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders(token);
  }, []);

  const getOrders = async (token) => {
    await axios
      .get(`${SERVER_URL}/admin/orders`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        // console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
      });
  };

  useEffect(() => {
    if (token) {
      currentAdmin(token)
        .then((res) => {
          // console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERROR", err);
          setOk(false);
        });
    }
  }, [token]);

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, token).then((res) => {
      toast.success("Status Changed !");
      getOrders(token);
    });
  };

  return (
    <div className="container-fluid">
      {ok ? (
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            <h2 className="text-center">ADMIN Dashboard</h2>
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      ) : (
        <LoadingToRedirect />
      )}
    </div>
  );
};

export default AdminDashboard;
