import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { updateCategory, getCategory } from "../../../functions/category";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = () => {
  // const users = useSelector((state) => state.user.loggedInUser);
  // const userData = users.data;

  let token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { slug } = useParams();

  useEffect(() => {
    loadCategory();
    // eslint-disable-next-line
  }, []);

  const loadCategory = () =>
    getCategory(slug).then((c) => {
      setName(c.data.name);
      console.log(c.data.name);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is Updated!`);
        navigate("/admin/category");
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

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
            <h3>Update Category</h3>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
