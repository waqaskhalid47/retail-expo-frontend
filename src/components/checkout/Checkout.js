import { Container } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import Cookie from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Checkout(props) {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, b) => a + b.price * b.qty, 0);
  console.log(total);

  async function handleToken(token, addresses) {
    const response = await Axios.post(
      "https://final-expo.herokuapp.com/api/products/checkout",
      { token, total }
    );

    const { status } = response.data;

    if (status === "success") {
      alert("Transaction Successful!");

      window.location.href = "/";

      Cookie.remove("cart");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <Container style={{ marginTop: "5%", padding: "3rem" }}>
      <div className="heading cf">
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "center", fontFamily: "ubuntu" }}
        >
          Checkout
        </Typography>
      </div>
      <Typography
        variant="h6"
        gutterBottom
        style={{ fontFamily: "ubuntu", marginTop: "2rem" }}
        className={classes.total}
      >
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem className={classes.listItem} key={product.title}>
            <ListItemText
              primary={product.title}
              secondary={product.decription}
            />
            <Typography variant="body2">Rs.{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total Items" />
          <Typography variant="subtitle1" className={classes.total}>
            {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            Rs.{cartItems.reduce((a, b) => a + b.price * b.qty, 0)}
          </Typography>
        </ListItem>
      </List>
      <p style={{ marginTop: "2rem", float: "right" }}>
        <StripeCheckout
          stripeKey="pk_test_51HDP2NBMxSYd2wLsFGriDdpR9fXjdZtHZ4KLCxEdstTBRuz3ciBW9ag2T2ekE5QLLmeUY0Jgi3HLLDwTUpifyktX00fJWKlCeM"
          token={handleToken}
          amount={total}
          billingAddress
          shippingAddress
        />
      </p>
    </Container>
  );
}
