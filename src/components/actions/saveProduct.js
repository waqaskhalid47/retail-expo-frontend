import { toast } from "react-toastify";
import productServices from "../../services/productServices";
import {
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
} from "../constants/productConstants";

const saveProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { data } = await productServices.addProduct(product).catch((err) =>
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

    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error });
  }
};

export default saveProduct;
