import { IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import saveProduct from "../actions/saveProduct";
import { storage } from "../firebase/index";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ExpoTech
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function Addproduct(props) {
  const classes = useStyles();
  const Product = useSelector((state) => state.newProduct);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setURL] = useState("");
  const [image, setImage] = useState("");

  const { product, success, loading } = Product;

  const uploadHandler = async () => {
    await storage
      .ref(`productImages/${image.name}`)
      .put(image)
      .then((res) => {
        console.log(res);
      });

    await storage
      .ref("productImages")
      .child(image.name)
      .getDownloadURL()
      .then((url) => {
        setURL(url);
      });
  };

  const dispatch = useDispatch();
  const saveProductHandler = () =>
    new Promise((resolve, reject) => {
      dispatch(
        saveProduct({
          title,
          price,
          category,
          inStock,
          description,
          productImage,
        })
      );
      resolve();
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Product
        </Typography>
        <div style={{ marginTop: "5rem" }}>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>

          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => {
              uploadHandler();
            }}
          >
            Upload
          </Button>

          {productImage ? (
            <Typography>Image uploaded Successfully!</Typography>
          ) : (
            <Typography>Add product Image </Typography>
          )}
        </div>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Count in Stock"
                value={inStock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>

          <a
            fullWidth
            className="btn"
            onClick={() => {
              saveProductHandler().then(() => {
                alert("product Saved Successfully");
                window.location.href = "/manageProducts";
              });
            }}
            style={{
              width: "100%",
              borderRadius: "5px",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            Save Product
          </a>

          <Button
            fullWidth
            onClick={() => {
              props.history.push("/manageProducts");
            }}
            style={{
              width: "100%",
              borderRadius: "5px",
              textAlign: "center",
              marginTop: ".7rem",
              backgroundColor: "#EFF0F1",
              padding: ".7rem",
            }}
          >
            Back
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
