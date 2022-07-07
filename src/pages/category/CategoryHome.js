import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import Loader from "../../components/Loader";

const CategoryHome = () => {
  const [category, setCatogory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCatogory(res.data.category);
      setProducts(res.data.products);
      //   console.log(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-dark bg-opacity-25">
              Loading... <Loader />
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-5 bg-dark bg-opacity-25">
              {products.length} Products in "{category.name}" category.
            </h4>
          )}
        </div>
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
