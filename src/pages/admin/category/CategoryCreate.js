import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import {
  createCategory,
  removeCategory,
  getCategories,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  // const users = useSelector((state) => state.user.loggedInUser);
  // const userData = users.data;

  let token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
      // console.log(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is Created!`);
        getCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure to Delete this ?")) {
      setLoading(true);
      removeCategory(slug, token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${slug}" has been Deleted!`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400);
          setLoading(false);
          toast.error(err.response.data);
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h3>Create Category</h3>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-dark w-75" key={c._id}>
              {c.name}
              <span
                className="btn btn-outline-dark btn-sm float-end"
                onClick={() => handleRemove(c.slug)}
              >
                Delete
              </span>
              <Link
                className="btn btn-outline-dark btn-sm mx-2 float-end"
                to={`/admin/category/${c.slug}`}
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
