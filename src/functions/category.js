import axios from "axios";

// let SERVER_URL = "http://localhost:8000/api";

//GET all the categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

//GET Single Category
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

//CREATE Category --> ADMIN only
export const createCategory = async (category, token) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      token,
    },
  });

//DELETE Category --> ADMIN only
export const removeCategory = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      token,
    },
  });

//UPDATE Category --> ADMIN only
export const updateCategory = async (slug, category, token) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      token,
    },
  });

//GET Category related Subs
export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
