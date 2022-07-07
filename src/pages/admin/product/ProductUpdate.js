import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import { getCategories, getCategorySubs } from "../../../functions/category";
import Loader from "../../../components/Loader";
import { updateProduct } from "../../../functions/product";
import { toast } from "react-toastify";
// import { getProduct } from "../../../functions/product";

const initialState = {
  title: "",
  description: "",
  price: "",
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

const ProductUpdate = () => {
  //State
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  //Token
  const token = localStorage.getItem("token");

  //Router
  let { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(slug);
    loadCategories();
    // eslint-disable-next-line
  }, []);

  const getProduct = async (slug) => {
    await axios
      .get(`${process.env.REACT_APP_API}/product/${slug}`)
      .then((p) => {
        console.log("Single Product", p.data);
        //Load Single Product
        setValues({ ...values, ...p.data });
        //Load single product sub category
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); //On first Load, show default subs
        });
        //Prepare array of sub ids to show as default sub values in ant-design
        let arr = [];
        p.data.subs.map((s) => arr.push(s._id));
        //   console.log("ARR", arr);
        setArrayOfSubs((prev) => arr); //Required for ant d select to work.
      });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
      //   console.log(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is Updated!`);
        navigate("/admin/products");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log("Subs Options", res.data);
      setSubOptions(res.data);
    });

    console.log("Existing Category", values.category);

    //If user clicks back to the original category
    //Show its sub categories in default
    if (values.category._id === e.target.value) {
      getProduct(slug);
    }

    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? <Loader /> : <h3>Product Update</h3>}
          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
