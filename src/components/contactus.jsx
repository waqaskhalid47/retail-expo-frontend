import React from "react";
import Footer from "./Footer";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Jumbotron } from "react-bootstrap";

const Contactus = () => {
  return (
    <>
      <Jumbotron
        style={{
          textAlign: "center",
          backgroundColor: "#FEBD69",
          padding: "10rem 0",
        }}
      >
        <Typography variant="h3" style={{ fontFamily: "ubuntu" }}>
          Contact us
        </Typography>
        <Typography
          variant="h4"
          style={{ paddingTop: "1rem", fontFamily: "ubuntu" }}
        >
          Always available at your service
        </Typography>
      </Jumbotron>

      <Footer />
    </>
  );
};

export default Contactus;
