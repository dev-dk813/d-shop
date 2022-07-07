import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { createSub, removeSub, getSubs } from "../../../functions/subCat";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { getCategories } from "../../../functions/category";

const SubCreate = () => {
  // const users = useSelector((state) => state.user.loggedInUser);
  // const userData = users.data;

  let token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
      // console.log(c.data);
    });

  const loadSubs = () =>
    getSubs().then((s) => {
      setSubs(s.data);
      // console.log(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is Created!`);
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure to Delete this ?")) {
      setLoading(true);
      removeSub(slug, token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${slug}" has been Deleted!`);
          loadSubs();
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
            <h3>Create Sub-Category</h3>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control w-50"
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
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
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-dark w-75" key={s._id}>
              {s.name}
              <span
                className="btn btn-outline-dark btn-sm float-end"
                onClick={() => handleRemove(s.slug)}
              >
                Delete
              </span>
              <Link
                className="btn btn-outline-dark btn-sm mx-2 float-end"
                to={`/admin/sub/${s.slug}`}
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

export default SubCreate;
