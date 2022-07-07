import React, { useEffect, useState } from "react";
import { getSub } from "../../functions/subCat";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import Loader from "../../components/Loader";

const SubHome = () => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      setSub(res.data.subCat);
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
              {products.length} Products in "{sub.name}" sub-category.
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

export default SubHome;
