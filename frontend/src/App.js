import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AddProductForm from "./components/AddProductForm";
import ProductEdit from "./components/ProductEdit";
import MyProductList from "./components/MyproductList";
import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <BrowserRouter>
      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Routes>
        <Route
          path="/"
          element={<ProductList searchTerm={searchTerm} />}
        ></Route>
        <Route
          path="/products/:id"
          element={user ? <ProductDetails /> : <Navigate to="/login" />}
        />
        <Route path="/productsform" element={<AddProductForm />} />
        <Route path="/edit-product/:id" element={<ProductEdit />} />
        <Route
          path="/myProduct"
          element={<MyProductList searchTerm={searchTerm} />}
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
