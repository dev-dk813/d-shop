import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getSub, updateSub } from "../../../functions/subCat";
import CategoryForm from "../../../components/forms/CategoryForm";
import { getCategories } from "../../../functions/category";

const SubUpdate = () => {
  // const users = useSelector((state) => state.user.loggedInUser);
  // const userData = users.data;

  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  let { slug } = useParams();

  useEffect(() => {
    loadCategories();
    loadSub();
    // eslint-disable-next-line
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
      // console.log(c.data);
    });

  const loadSub = () =>
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is Updated!`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        setLoading(false);
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
            <h3>Update Sub-Category</h3>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              onChange={(e) => setParent(e.target.value)}
              className="form-control w-50"
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
