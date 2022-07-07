import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import LoadingToRedirect from "../../../components/LoadingToRedirect";
import AdminNav from "../../../components/nav/AdminNav";
import { currentAdmin } from "../../../functions/auth";
import { removeProduct } from "../../../functions/product";

const AllProducts = () => {
  let token = localStorage.getItem("token");
  const [ok, setOk] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductsByCount(10);
    // eslint-disable-next-line
  }, []);

  const getProductsByCount = async (count) => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API}/products/${count}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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

  const handleRemove = (slug) => {
    let answer = window.confirm("Are sure want to delete ?");
    if (answer) {
      //   console.log("Delete", slug);
      removeProduct(slug, token)
        .then((res) => {
          getProductsByCount();
          toast.success(`${res.data.title} is Deleted !`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      {ok ? (
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h2>All Products</h2>
            )}
            <div className="row">
              {products.map((product) => (
                <div className="col-md-4 pb-3" key={product._id}>
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <LoadingToRedirect />
      )}
    </div>
  );
};

export default AllProducts;
