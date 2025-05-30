import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Signup from "../Pages/Auth/Signup";
import Payment from "../Pages/Payment/Payment";
import Order from "../Pages/Orders/Order";
import Cart from "../Pages/Cart/Cart";
import Results from "../Pages/Results/Result";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order" element={<Order />} />
      <Route path="/catagory/:catagoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
