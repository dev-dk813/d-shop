import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";
import { productStar } from "../functions/product";
import { useSelector } from "react-redux";

const Product = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.currentUser.authToken;
  const User = user.currentUser;

  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct(slug);
  }, [slug]);

  useEffect(() => {
    if (product.ratings && User) {
      let existingRatingObject = product.ratings.find(
        (element) => element.postedBy.toString() === User._id.toString()
      );

      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product.ratings, User]);

  const loadSingleProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/product/${slug}`)
      .then((res) => {
        setProduct(res.data);
        //Load Related
        getRelated(res.data._id);
        // console.log(res.data);
      });
  };

  const getRelated = async (productId) => {
    await axios
      .get(`${process.env.REACT_APP_API}/product/related/${productId}`)
      .then((res) => {
        // console.log(res.data);
        setRelated(res.data);
      });
  };

  const onStarClick = (newRating, name) => {
    // console.table(newRating, name);
    setStar(newRating);
    productStar(name, newRating, token).then((res) => {
      // console.log("Rating Clicked", res.data);
      loadSingleProduct(slug); //If you want to show updated rating in real-time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h3>Related Products</h3>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div className="col-md-4" key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
