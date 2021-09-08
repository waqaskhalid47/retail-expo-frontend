import { CART_REMOVE_ITEM } from "../constants/cartConstants";
import Cookie from "js-cookie";

const cartRemove = (productID) => (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM, payload: productID });

    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

export default cartRemove;
