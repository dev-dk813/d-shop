import axios from "axios";

// let SERVER_URL = process.env.REACT_APP_API;

export const login = async (email, password) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/auth/login`,
    email,
    password
  );
};

export const currentAdmin = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/auth/current-admin`,
    {},
    {
      headers: {
        token,
      },
    }
  );
};
