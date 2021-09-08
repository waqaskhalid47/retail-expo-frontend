import React from "react";
import "../App.css";
import PinterestIcon from "@material-ui/icons/Pinterest";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
const Footer = () => {
  return (
    <div className="footer">
      <div className="contain">
        <div className="col">
          <h1>Company</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Products</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Accounts</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Resources</h1>
          <ul>
            <li>Webmail</li>
            <li>Redeem code</li>
            <li>WHOIS lookup</li>
            <li>Site map</li>
            <li>Web templates</li>
            <li>Email templates</li>
          </ul>
        </div>
        <div className="col">
          <h1>Support</h1>
          <ul>
            <li>Contact us</li>
            <li>Web chat</li>
            <li>Open ticket</li>
          </ul>
        </div>
        <div className="col social">
          <h1>Social</h1>
          <ul>
            <li>
              <FacebookIcon />
            </li>
            <li>
              <PinterestIcon />
            </li>
            <li>
              <InstagramIcon />
            </li>
          </ul>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default Footer;
