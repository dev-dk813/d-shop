import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import noImg from "../../images/noimage.png";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../reducers/cartReducer";
import { setVisible } from "../../reducers/drawerReducer";
import { showAverage } from "../../functions/showAverage";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click To Add");

  //REDUX
  const dispatch = useDispatch();

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
      //Add to Redux-State
      dispatch(AddToCart(unique));
      dispatch(setVisible(true));

      // Save to LocalStorage
      localStorage.setItem("cart", JSON.stringify(unique));
      // Show ToolTip
      setTooltip("Added");
    }
  };

  //Destructure
  const { images, title, description, slug } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          src={images && images.length ? images[0].url : noImg}
          alt="img"
          style={{ height: "300px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" />
          <br />
          View Product
        </Link>,
        <Tooltip title={tooltip}>
          <button
            type="link"
            className="border-0 bg-light"
            onClick={handleAddToCart}
            disabled={product.quantity < 1}
          >
            <ShoppingCartOutlined className="text-danger" />
            <br />
            {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
          </button>
        </Tooltip>,
      ]}
    >
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Meta
        title={title}
        description={`${description && description.substring(0, 50)}...`}
      />
    </Card>
  );
};

export default ProductCard;
