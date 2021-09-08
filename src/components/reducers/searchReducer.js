import { PRODUCT_SEARCH } from "../constants/productConstants";

const searchReducer = (state = { search: "" }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH:
      return { search: action.payload };

    default:
      return state;
  }
};

export default searchReducer;
