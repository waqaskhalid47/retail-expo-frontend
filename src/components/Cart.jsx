import { Divider, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import addtoCart from "./actions/addtoCart";
import cartRemove from "./actions/removeFromCart";
import "./cart.css";
import "../App.css";
import UserServices from "../services/UserServices";
const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productID = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();

  const checkoutHandler = () => {
    UserServices.isLoggedin
      ? props.history.push("/checkout")
      : props.history.push("/login");
  };

  const removeFromCart = (productID) => {
    dispatch(cartRemove(productID));
  };

  useEffect(() => {
    dispatch(addtoCart(productID, qty));
  }, []);

  return (
    <div className="wrap cf">
      <h1 className="projTitle">
        Accessories<span>-Shop</span> Shopping Cart
      </h1>
      <div className="heading cf">
        <h1>My Cart</h1>
        <a
          className="btn"
          onClick={() => {
            props.history.push("/products");
          }}
          style={{
            textDecoration: "none",
            float: "right",
          }}
        >
          Continue Shopping
        </a>
      </div>

      <div className="cart">
        <ul className="cartWrap">
          {cartItems.length === 0 ? (
            <p>Cart is Empty</p>
          ) : (
            cartItems.map((item) => (
              <li className="items odd">
                <div className="infoWrap">
                  <div className="cartSection">
                    <img src={item.productImage} alt="" className="itemImg" />
                    <p className="itemNumber">{item.productID}</p>
                    <h3>{item.title}</h3>

                    <p>
                      <select
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(addtoCart(item.productID, e.target.value));
                        }}
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <option value={x + 1}>{x + 1}</option>
                        ))}{" "}
                      </select>
                    </p>

                    <p className="stockStatus">
                      {" "}
                      Status: {item.inStock > 0 ? "Available" : "Out of stock"}
                    </p>
                  </div>

                  <div className="prodTotal cartSection">
                    <p>Rs.{item.price}</p>
                  </div>
                  <div className="cartSection removeWrap">
                    <a
                      className="remove"
                      onClick={() => removeFromCart(item.productID)}
                    >
                      <DeleteIcon />
                    </a>
                  </div>
                </div>
                <Divider />
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="subtotal cf">
        <ul>
          <li className="totalRow">
            {" "}
            <span className="label">Total Items</span>
            <span className="value">
              {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
            </span>
          </li>
          <li className="totalRow">
            <span className="label">Subtotal</span>

            <span className="value">
              Rs.{cartItems.reduce((a, b) => a + b.price * b.qty, 0)}
            </span>
          </li>

          <li className="totalRow final">
            <span className="label">Total</span>
            <span className="value">
              {" "}
              Rs.{cartItems.reduce((a, b) => a + b.price * b.qty, 0)}
            </span>
          </li>

          {cartItems.length > 0 && (
            <li className="totalRow">
              <a
                className="btn"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  checkoutHandler();
                }}
              >
                Checkout
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
