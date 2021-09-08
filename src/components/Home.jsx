import {
  Container,
  Typography,
  Button,
  IconButton,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Jumbotron } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer.jsx";
import HorizontalScroller from "./horizontalScroll";
import productList from "./actions/productList";
import StorefrontIcon from "@material-ui/icons/Storefront";
import "../App.css";
const useStyles = makeStyles({
  hero: {
    height: "500px",
    backgroundImage:
      'linear-gradient( rgba(255,255,255,0.4), rgba(255, 255, 253, 0.4) ),url("https://images.unsplash.com/photo-1524591431555-cc7876d14adf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1939&q=80") ',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "7% 0",
    textAlign: "center",
  },
  spacing: {
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  typo: {
    textAlign: "center",
    fontFamily: "ubuntu",
    marginTop: "5rem",
  },
});

const Home = (props) => {
  const classes = useStyles();
  const pList = useSelector((state) => state.listProducts);
  const { products, loading, error } = pList;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(productList());
  }, []);

  return (
    <>
      <Jumbotron className={classes.hero}>
        <p>
          <h1 style={{ fontSize: "3rem" }}>Accessories Shop</h1>
        </p>
        <p style={{ fontSize: "2rem", padding: "2rem 0" }}>
          We believe in quality and customer care
        </p>
        <a
          className="btn"
          outlined
          style={{
            padding: ".5rem 2rem .5rem 2rem ",
          }}
          onClick={() => {
            props.history.push("/products");
          }}
        >
          Shop now
        </a>
      </Jumbotron>
      <Container className={classes.spacing}>
        <Typography variant="h3" className={classes.typo}>
          Top Selling
        </Typography>
        <div className="scrolling-wrapper ">
          {loading
            ? "loading"
            : error
            ? "error"
            : products.map((product, index) => {
                if (product.category == "accessory")
                  return <HorizontalScroller key={index} product={product} />;
              })}
        </div>
        <Typography variant="h3" className={classes.typo}>
          Laptops
        </Typography>
        <div className="scrolling-wrapper ">
          {loading
            ? "loading"
            : error
            ? "error"
            : products.map((product, index) => {
                if (product.category == "laptop")
                  return <HorizontalScroller key={index} product={product} />;
              })}
        </div>

        <Typography variant="h3" className={classes.typo}>
          Mobile phones
        </Typography>
        <div className="scrolling-wrapper ">
          {loading
            ? "loading"
            : error
            ? "error"
            : products.map((product, index) => {
                if (product.category == "phone")
                  return <HorizontalScroller key={index} product={product} />;
              })}
        </div>
        <div
          style={{
            marginTop: "5rem",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Button
            style={{
              textDecoration: "none",

              padding: ".2rem 3rem",
              backgroundColor: "#232F3E",
              color: "white",
            }}
            onClick={() => {
              props.history.push("/products");
            }}
          >
            <IconButton color="inherit">
              <StorefrontIcon />
            </IconButton>
            Go to Shop
          </Button>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
