import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Auth from "../Pages/Auth/Auth";
import Payment from "../Pages/Payment/Payment";
import Order from "../Pages/Orders/Order";
import Cart from "../Pages/Cart/Cart";
import Results from "../Pages/Results/Result";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51RVPxKC8uWjMwhuD7VxA2fxoVL689lbSK3QncZJZTkk21WwKXaYVJdlXmg9p1StT9lLJzQg9kPXjA3EsCydhX1Pz00BoNZayqg"
);

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />

      {/* Wrap the payment route with Elements */}
      <Route
        path="/payments"
        element={
          <ProtectedRoute msg={"you must login to pay"} redirect={"/payments"}>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
        }
      />

      <Route path="/orders" element={<Order />} />
      <Route path="/catagory/:catagoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/" element={<Landing />} />

      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
