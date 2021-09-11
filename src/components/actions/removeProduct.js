import { toast } from "react-toastify";
import productServices from "../../services/productServices";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from "../constants/productConstants";

const productRemove = (productID) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productID });
    const product = await productServices
      .deleteProduct(productID)
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

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: product, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error });
  }
};

export default productRemove;
