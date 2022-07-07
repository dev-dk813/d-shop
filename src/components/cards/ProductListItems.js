import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price <span className="label pull-right">$ {price}</span>
      </li>

      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link to={`/category/${category.slug}`} className="label pull-right">
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              to={`/sub/${s.slug}`}
              key={s._id}
              className="label pull-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping
        <span className="label pull-right">{shipping}</span>
      </li>

      <li className="list-group-item">
        Color
        <span className="label pull-right">{color}</span>
      </li>

      <li className="list-group-item">
        Brand
        <span className="label pull-right">{brand}</span>
      </li>

      <li className="list-group-item">
        Available
        <span className="label pull-right">{quantity}</span>
      </li>

      <li className="list-group-item">
        Sold
        <span className="label pull-right">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
