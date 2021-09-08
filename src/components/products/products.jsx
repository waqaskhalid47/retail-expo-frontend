import { Container, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import productList from "../actions/productList";
import SingleProduct from "./SingleProduct";
import Footer from "../Footer";

const Products = () => {
  //Fetching Products

  const pList = useSelector((state) => state.listProducts);
  const { products, loading, error } = pList;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(productList());
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Container>
        {" "}
        <Typography
          variant="h2"
          style={{
            paddingBottom: "5rem",
            paddingTop: "2rem",
            fontFamily: "ubuntu",
          }}
        >
          Shop
          <Divider variant="middle" style={{ marginTop: "1rem" }} />
        </Typography>
      </Container>
      {products.length === 0 ? (
        <p>There is no product</p>
      ) : (
        <div>
          <Container>
            <Grid
              container
              spacing={5}
              style={{
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {products.map((product, index) => {
                return <SingleProduct key={index} product={product} />;
              })}
            </Grid>
          </Container>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Products;
