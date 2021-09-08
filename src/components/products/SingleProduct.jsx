import { CardActionArea, Grid, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../../App.css";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 210,
  },
});

const SingleProduct = ({ product }) => {
  const classes = useStyles();
  const qty = 1;
  const wish = useSelector((state) => state.searchText);

  const search = wish.search.toLowerCase();

  if (search != "" && product.title.toLowerCase().indexOf(search) === -1) {
    return null;
  }

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Grid container justify="center" spacing={1}>
        <Grid item>
          <Link
            to={`/products/product_details/${product._id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Card className={classes.root}>
              <CardActionArea>
                <img
                  component="img"
                  alt="Contemplative Reptile"
                  image="Iphone"
                  title="Contemplative Reptile"
                  style={{
                    maxWidth: "100%",
                    width: "auto",

                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                  className={classes.media}
                  src={product.productImage}
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    numberOfLines={1}
                    component="h2"
                    style={{
                      width: "100%",
                      float: "left",
                      fontFamily: "Ubuntu",
                    }}
                  >
                    {product.title.length > 30
                      ? product.title.substring(0, 30 - 3) + "..."
                      : product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      float: "left",
                      color: "#F77224",
                      fontSize: "1.2rem",
                      fontFamily: "Ubuntu",
                    }}
                  >
                    Rs.{product.price}{" "}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link
                  to={`/cart/${product._id}/?=${qty}`}
                  style={{
                    textDecoration: "none",
                    alignItems: "center",
                    textAlign: "center",
                    alignContent: "center",
                    width: "100%",
                    padding: ".2rem",
                    backgroundColor: "#FEBD69",
                    color: "black",
                  }}
                  disablePadding
                >
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <ShoppingCartIcon />
                  </IconButton>
                  Add to cart{" "}
                </Link>
              </CardActions>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleProduct;
