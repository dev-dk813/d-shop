import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import noImg from "../../images/noimage.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { AddToCart } from "../../reducers/cartReducer";
import { setVisible } from "../../reducers/drawerReducer";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { showAverage } from "../../functions/showAverage";

const { TabPane } = Tabs;

// This is Children component of Product Page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("Click To Add");

  const navigate = useNavigate();

  //REDUX
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.currentUser.authToken;

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // If cart is in localStorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //Push new product to Cart
      cart.push({
        ...product,
        count: 1,
      });
      //Remove Duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // console.log('unique', unique)

      // Save to LocalStorage
      localStorage.setItem("cart", JSON.stringify(unique));
      // Show ToolTip
      setTooltip("Added");

      //Add to Redux-State
      dispatch(AddToCart(unique));
      dispatch(setVisible(true));
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, token).then((res) => {
      console.log("ADDED TO WISHLIST", res);
      toast.success("ADDED TO WISHLIST");
      navigate("/user/wishlist");
    });
  };
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={i.url} alt="IMG" key={i.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={<img src={noImg} alt="NoIMG" className="card-image mb-3" />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on 91xxxxxxx28 to know about our products.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="h1 bg-info bg-opacity-50 p-3 text-center">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <button className="border-0 bg-light" onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                Add To Cart
              </button>
            </Tooltip>,
            <button onClick={handleAddToWishlist} className="btn btn-light">
              <HeartOutlined /> <br /> Add to Wishlist
            </button>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
