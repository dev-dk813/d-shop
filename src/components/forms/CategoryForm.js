import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control mt-3 w-50"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <button className="btn btn-outline-dark mt-3 w-50">Save</button>
      </div>
    </form>
  );
};

export default CategoryForm;
