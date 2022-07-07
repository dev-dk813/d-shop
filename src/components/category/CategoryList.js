import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import Loader from "../Loader";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      // console.log(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        className="col btn btn-outline-primary btn-block btn-lg m-3"
        key={c._id}
      >
        <Link className="text-dark" to={`/category/${c.slug}`}>
          {c.name}
        </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">{loading ? <Loader /> : showCategories()}</div>
    </div>
  );
};

export default CategoryList;
