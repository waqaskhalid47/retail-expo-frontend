import {
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
} from "../constants/productConstants";

const saveProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return {
        product: action.payload,
        success: true,
        loading: false,
      };
    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default saveProductReducer;
