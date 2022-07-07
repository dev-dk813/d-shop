import axios from "axios";

// let SERVER_URL = "http://localhost:8000/api";

//CREATE PRODUCT --> ADMIN only
export const createProduct = async (product, token) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      token,
    },
  });

//GET All products by Count
export const getProductsByCount = async (count) => {
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

//Remove Product
export const removeProduct = async (slug, token) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      token,
    },
  });

//GET Single Product
export const getProduct = async (slug) => {
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

//UPDATE Product
export const updateProduct = async (slug, product, token) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      token,
    },
  });

//GET Products
export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () => {
  await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

//Product Ratings
export const productStar = async (productId, star, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        token,
      },
    }
  );

//GET Related Products
export const getRelated = async (productId) => {
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
};

//GET Related Products
export const fetchProductsByFilter = async (arg) => {
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};
