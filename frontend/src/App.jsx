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
import UpdateCustomer from "./pages/UpdateCustomer"
import Addresses from "./pages/Addresses";
import UpdateAddress from "./pages/UpdateAddresses";

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
        <Route path="*" element={<NotFound />} />
        <Route
          path="/register"
          element={<PrivateRoute children={<Signup />} requireAuth={false} />}
        />
        <Route
          path="/login"
          element={<PrivateRoute children={<Login />} requireAuth={false} />}
        />
        <Route
          path="/forgot-password"
          element={
            <PrivateRoute children={<ForgotPassword />} requireAuth={false} />
          }
        />
        <Route path="/" element={<PrivateRoute children={<Home />} />} />
        <Route
          path="/users/my-profile"
          element={<PrivateRoute children={<UserForm />} />}
        />
        <Route
          path="users/all-users"
          element={<PrivateRoute children={<Users />} />}
        />
        <Route
          path="customers/all-customers"
          element={<PrivateRoute children={<Customers />} />}
        />
        <Route
          path="customers/add-customer"
          element={<PrivateRoute children={<AddCustomer />} />}
        />
        <Route
          path="customers/update/:id"
          element={<PrivateRoute children={<UpdateCustomer />} />}
        />
        <Route
          path="addresses/all-addresses"
          element={<PrivateRoute children={<Addresses />} />}
        />
        <Route
          path="addresses/add-addresses"
          element={<PrivateRoute children={<AddCustomer />} />}
        />
        <Route
          path="addresses/update/:id"
          element={<PrivateRoute children={<UpdateAddress />} />}
        />
        
      </Routes>
    </>
  );
}

export default App;
