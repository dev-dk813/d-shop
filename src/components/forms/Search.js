import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { searchQuery } from "../../reducers/searchReducer";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch(searchQuery(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control me-2"
        placeholder="Search"
      />
      <SearchOutlined
        onClick={handleSubmit}
        className="pointer-event text-light mt-2 mx-2"
        style={{ fontSize: "22px" }}
      />
    </form>
  );
};

export default Search;
