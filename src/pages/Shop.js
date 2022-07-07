import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import axios from "axios";
import { fetchProductsByFilter } from "../functions/product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    getProductsByCount(12);
  }, []);

  //1. Load Products by Default pn page Load
  const getProductsByCount = async (count) => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API}/products/${count}`)
      .then((p) => {
        setProducts(p.data);
        setLoading(false);
      });
  };

  //2. Load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 500);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = async (arg) => {
    await axios
      .post(`${process.env.REACT_APP_API}/search/filters`, arg)
      .then((res) => {
        setProducts(res.data);
        console.log("RES", res.data);
      });
  };

  // const fetchProducts = (arg) => {
  //   fetchProductsByFilter(arg).then((res) => {
  //     setProducts(res.data);
  //     console.log("RES", res.data);
  //   });
  // };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">Search/Filter Menu</div>

        <div className="col-md-9">
          {loading ? (
            <h3 className="text-danger">Loading...</h3>
          ) : (
            <h3 className="text-center">Products</h3>
          )}

          {products.length < 1 && <p>No Products Found.</p>}

          <div className="row pb-4">
            {products.map((p) => (
              <div key={p._id} className="col-md-3 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
