import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const addtoCart = (productID, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      "https://final-expo.herokuapp.com/api/products/" + productID
    );

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productID: data._id,
        title: data.title,
        inStock: data.inStock,
        price: data.price,
        description: data.description,
        productImage: data.productImage,
        qty,
      },
    });

    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cart", JSON.stringify(cartItems));
  } catch (error) {
    toast.error(error, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default addtoCart;
