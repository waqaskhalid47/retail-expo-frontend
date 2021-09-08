import { IconButton, Container, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import HorizontalScroller from "./horizontalScroll.jsx";
import productDetails from "./actions/productDetails";
import productList from "./actions/productList";

const ProductPage = (props) => {
  const pDetails = useSelector((state) => state.pDetails);
  const { product, loading, error } = pDetails;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const pList = useSelector((state) => state.listProducts);
  const { products, loading: loadingR, error: errorR } = pList;

  React.useEffect(() => {
    dispatch(productDetails(props.match.params.id));
    dispatch(productList());
  }, []);

  const handleAddtoCart = () => {
    props.history.push("/cart/" + props.match.params.id + "/?=" + quantity);
  };

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <section className="section-a">
        <div className="container">
          <div>
            <h1>{product.title} </h1>
            <p>{product.description}</p>

            <h4 style={{ color: "#F77224" }}>Rs.{product.price}</h4>

            <p>
              <Rating />
            </p>
            <p> Status: {product.inStock > 0 ? "Available" : "Out of Stock"}</p>
            <p>
              Quantity:{" "}
              <select
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              >
                {[...Array(product.inStock).keys()].map((x) => (
                  <option value={x + 1}>{x + 1}</option>
                ))}{" "}
              </select>
            </p>
            {product.inStock > 0 && (
              <a
                onClick={() => {
                  handleAddtoCart();
                }}
                style={{ textDecoration: "none" }}
                className="btn"
              >
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
                Add to cart
              </a>
            )}
          </div>
          <img src={product.productImage} alt="" />
        </div>
      </section>

      <Container style={{ marginTop: "10rem", marginBottom: "2rem" }}>
        <Typography variant="h3" style={{ fontFamily: "ubuntu" }}>
          Related products
        </Typography>
        <div className="scrolling-wrapper ">
          {loadingR
            ? "loading"
            : errorR
            ? "error"
            : products.map((item, index) => {
                if (item.category == product.category)
                  return <HorizontalScroller key={index} product={item} />;
              })}
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
