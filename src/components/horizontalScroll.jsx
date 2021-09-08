import {
  Card,
  CardActionArea,
  CardContent,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CardImg } from "react-bootstrap";
import "../App.css";

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

const HorizontalScroll = ({ product }) => {
  const classes = useStyles();
  return (
    <Link
      //   to={`/products/product_details/${product._id}`}
      onClick={() => {
        window.location.href = "/products/product_details/" + product._id;
      }}
      style={{
        textDecoration: "none",
      }}
    >
      <div className="cardd">
        <Card className={classes.root}>
          <CardActionArea>
            <CardImg
              style={{
                height: "210px",
                maxWidth: "100%",
                width: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
              component="img"
              alt={product.title}
              title="Contemplative Reptile"
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
                  fontWeight: "300",
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
                  // alignItems: "center",
                  // textAlign: "center",
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
        </Card>
      </div>
    </Link>
  );
};

export default HorizontalScroll;
