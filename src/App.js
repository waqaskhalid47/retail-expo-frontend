import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login from "./components/auth/login.jsx";
import signup from "./components/auth/signup.jsx";
import Cart from "./components/Cart.jsx";
import contactus from "./components/contactus";
import Home from "./components/Home";
import notfound from "./components/notfound.jsx";
import ProductPage from "./components/ProductPage.jsx";
import Addproduct from "./components/products/Addproduct.jsx";
import Editproduct from "./components/products/editProduct";
import ManageProducts from "./components/products/manageProducts.jsx";
import products from "./components/products/products";
import TopMenu from "./components/TopMenu";
import Checkout from "./components/checkout/Checkout.js";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <TopMenu />
        <Switch>
          <Route
            path="/products/product_details/:id"
            component={ProductPage}
          ></Route>
          <Route path="/cart/:id?" component={Cart}></Route>
          <Route
            path="/manageProducts/Addproduct"
            component={Addproduct}
          ></Route>
          <Route
            path="/manageProducts/Editproduct/:id"
            component={Editproduct}
          ></Route>

          <Route path="/manageProducts" component={ManageProducts}></Route>
          <Route path="/checkout" component={Checkout}></Route>

          <Route path="/products" component={products}></Route>
          <Route path="/contact-us" component={contactus}></Route>
          <Route path="/notfound" component={notfound}></Route>
          <Route path="/login" component={login}></Route>
          <Route path="/signup" component={signup}></Route>

          <Route path="/" exact component={Home}></Route>
          <Redirect to="/notfound"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
