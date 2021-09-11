import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../App.css";
import productServices from "../../services/productServices";
import { storage } from "../firebase/index";
import { IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

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
  input: { display: "none" },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function Editproduct(props) {
  const classes = useStyles();
  const productID = props.match.params.id;

  const [title, setTitle] = React.useState();
  const [price, setPrice] = React.useState();
  const [category, setCategory] = React.useState();
  const [inStock, setStock] = React.useState();
  const [description, setDescription] = React.useState();
  const [productImage, setURL] = useState("");
  const [image, setImage] = useState("");

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

  React.useEffect(() => {
    productServices
      .getSingleProduct(productID)
      .then((res) => {
        setTitle(res.title);
        setPrice(res.price);
        setCategory(res.category);
        setDescription(res.description);
        setStock(res.inStock);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateProductHandler = () =>
    new Promise((resolve, reject) => {
      productServices
        .updateProduct(productID, {
          title,
          price,
          category,
          inStock,
          description,
          productImage,
        })
        .catch((err) =>
          toast.error(err.response.data, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );

      resolve();
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
        <div style={{ marginTop: "5rem" }}>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
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
                autoFocus
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
                autoFocus
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
                autoFocus
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
                autoFocus
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
                autoFocus
              />
            </Grid>
          </Grid>

          <a
            fullWidth
            className="btn"
            onClick={() => {
              updateProductHandler().then(() => {
                alert("product Updated Successfully");
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
            Update Product
          </a>

          <Button
            fullWidth
            onClick={() => {
              window.location.href = "/manageProducts";
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
        {/* <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button
          onClick={() => {
            uploadHandler();
          }}
        >
          Upload
        </button> */}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
