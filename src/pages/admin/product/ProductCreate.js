import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import Loader from "../../../components/Loader";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Red", "Black", "Silver", "White", "Blue"],
  brands: ["Apple", "ASUS", "Nike", "Adidas", "Fossil"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  // const users = useSelector((state) => state.user.loggedInUser);
  // const userData = users.data;

  let token = localStorage.getItem("token");

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
      // console.log(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is Created!`);
        //Cannot reload now because state is disappearing after reload page ---> Do it Later
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("Subs Options", res.data);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? <Loader /> : <h3>Product Create</h3>}

          {JSON.stringify(values.images)}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
