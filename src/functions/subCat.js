import axios from "axios";

// let SERVER_URL = "http://localhost:8000/api";

//GET all the sub-categories
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

//GET Single Sub-Category
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

//CREATE Sub-Category --> ADMIN only
export const createSub = async (sub, token) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      token,
    },
  });

//DELETE Category --> ADMIN only
export const removeSub = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      token,
    },
  });

//UPDATE Category --> ADMIN only
export const updateSub = async (slug, sub, token) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      token,
    },
  });
