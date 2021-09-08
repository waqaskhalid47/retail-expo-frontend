import { PRODUCT_SEARCH } from "../constants/productConstants";

const searchProduct = (text) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH, payload: text });
  } catch (error) {
    console.log(error);
  }
};

export default searchProduct;
