/*
import logos from assets
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import UserForm from "./pages/UserProfile";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";

function PrivateRoute({ children, requireAuth = true }) {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (
    isLoggedIn &&
    (location.pathname == "/login" || location.pathname == "/register")
  ) {
    return <Navigate to="/" />;
  }
  if (!isLoggedIn && requireAuth) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute children={<Home />} />} />
        <Route
          path="/my-profile"
          element={<PrivateRoute children={<UserForm />} />}
        />
        <Route
          path="/all-users"
          element={<PrivateRoute children={<Users />} />}
        />
        <Route
          path="/all-customers"
          element={<PrivateRoute children={<Customers />} />}
        />
        <Route
          path="/add-customer"
          element={<PrivateRoute children={<AddCustomer />} />}
        />
        <Route
          path="/forgot-password"
          element={
            <PrivateRoute children={<ForgotPassword />} requireAuth={false} />
          }
        />
        <Route
          path="/register"
          element={<PrivateRoute children={<Signup />} requireAuth={false} />}
        />
        <Route
          path="/login"
          element={<PrivateRoute children={<Login />} requireAuth={false} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
