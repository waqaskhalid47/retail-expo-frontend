import { Button, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Cookie from "js-cookie";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserServices from "../services/UserServices";
import searchProduct from "./actions/search";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,

    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  link: {
    color: "white",
    paddingRight: "1rem",

    textDecoration: "none",
    marginTop: ".5rem",
    fontFamily: "ubuntu",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    alignItems: "center",
    justifyContent: "center",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function TopMenu() {
  const [search, setSearch] = React.useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const searchHandler = () => {
    dispatch(searchProduct(search));
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {" "}
        <Typography variant="h6">
          <Link to="/" className={classes.link} style={{ color: "black" }}>
            Home
          </Link>
        </Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="h6">
          <Link
            to="/products"
            className={classes.link}
            style={{ color: "black" }}
          >
            Shop
          </Link>
        </Typography>
      </MenuItem>

      <MenuItem>
        {" "}
        <Typography variant="h6">
          <Link
            to="/contact-us"
            className={classes.link}
            style={{ color: "black" }}
          >
            Contact us
          </Link>
        </Typography>
      </MenuItem>

      {UserServices.isLoggedin
        ? UserServices.getLoggedinfo().role === "admin" && (
            <MenuItem>
              <Link to="/manageProducts" className={classes.link}>
                <Button
                  color="secondary"
                  style={{
                    color: "black",
                    backgroundColor: "#FEBD69",
                    textDecoration: "none",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  Admin
                </Button>
              </Link>
            </MenuItem>
          )
        : ""}

      {!UserServices.isLoggedin ? (
        <>
          <MenuItem>
            <Link to="/login" className={classes.link}>
              <Button
                color="secondary"
                style={{
                  color: "black",
                  backgroundColor: "#FEBD69",
                  textDecoration: "none",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                Login
              </Button>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/signup" className={classes.link}>
              <Button
                color="secondary"
                style={{
                  color: "black",
                  backgroundColor: "#FEBD69",
                  textDecoration: "none",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",

                  marginLeft: "0.1rem",
                }}
              >
                Sign up
              </Button>
            </Link>
          </MenuItem>
        </>
      ) : (
        <MenuItem>
          <Link className={classes.link}>
            <Button
              color="secondary"
              style={{
                color: "black",
                backgroundColor: "#FEBD69",
                textDecoration: "none",
                paddingLeft: "1rem",
                paddingRight: "1rem",

                marginLeft: "0.1rem",
              }}
              onClick={UserServices.logout}
            >
              Logout
            </Button>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#232F3E",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.link} to="/" style={{ color: "#FEBD69" }}>
              Expotech
            </Link>
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search the Store"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#FEBD69",
              borderRadius: "0rem .5rem .5rem 0rem",
              padding: ".3rem",
              marginLeft: "-15px",
            }}
            onClick={() => {
              searchHandler();
            }}
          >
            <SearchIcon />
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography variant="h6">
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link to="/products" className={classes.link}>
                Shop
              </Link>
            </Typography>

            <Typography variant="h6">
              <Link to="/contact-us" className={classes.link}>
                Contact us
              </Link>
            </Typography>
            {UserServices.isLoggedin
              ? UserServices.getLoggedinfo().role === "admin" && (
                  <Link to="/manageProducts" className={classes.link}>
                    <Button
                      color="secondary"
                      style={{
                        color: "black",
                        backgroundColor: "#FEBD69",
                        textDecoration: "none",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      Admin
                    </Button>
                  </Link>
                )
              : ""}

            {!UserServices.isLoggedin ? (
              <>
                <Link to="/login" className={classes.link}>
                  <Button
                    color="secondary"
                    style={{
                      color: "black",
                      backgroundColor: "#FEBD69",
                      textDecoration: "none",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup" className={classes.link}>
                  <Button
                    color="secondary"
                    style={{
                      color: "black",
                      backgroundColor: "#FEBD69",
                      textDecoration: "none",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",

                      marginLeft: "0.1rem",
                    }}
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <Link className={classes.link}>
                <Button
                  color="secondary"
                  style={{
                    color: "black",
                    backgroundColor: "#FEBD69",
                    textDecoration: "none",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",

                    marginLeft: "0.1rem",
                  }}
                  onClick={UserServices.logout}
                >
                  Logout
                </Button>
              </Link>
            )}

            <IconButton
              aria-label="cart"
              color="inherit"
              onClick={() => {
                window.location.href = "/cart/";
              }}
            >
              <StyledBadge
                badgeContent={cartItems.reduce((a, c) => a + Number(c.qty), 0)}
                color="secondary"
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {UserServices.isLoggedin && (
                <Typography> {UserServices.getLoggedinfo().name} </Typography>
              )}

              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
