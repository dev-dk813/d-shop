import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/subCategory/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/subCategory/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Cart = lazy(() => import("./pages/Cart"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./pages/Payment"));
const Shop = lazy(() => import("./pages/Shop"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          ...EC
          <LoadingOutlined />
          MMERCE...
        </div>
      }
    >
      <Router>
        <Header />
        <SideDrawer />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/category" element={<CategoryCreate />} />
          <Route
            exact
            path="/admin/category/:slug"
            element={<CategoryUpdate />}
          />
          <Route exact path="/admin/sub" element={<SubCreate />} />
          <Route exact path="/admin/sub/:slug" element={<SubUpdate />} />
          <Route exact path="/admin/product" element={<ProductCreate />} />
          <Route exact path="/admin/products" element={<AllProducts />} />
          <Route
            exact
            path="/admin/product/:slug"
            element={<ProductUpdate />}
          />
          <Route exact path="/admin/coupon" element={<CreateCouponPage />} />
          <Route exact path="/product/:slug" element={<Product />} />
          <Route exact path="/category/:slug" element={<CategoryHome />} />
          <Route exact path="/sub/:slug" element={<SubHome />} />
          <Route path="/user/history" element={<History />} />
          <Route path="/user/password" element={<Password />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
