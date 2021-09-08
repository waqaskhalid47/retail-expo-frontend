import Cookie from "js-cookie";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import cartReducer from "../reducers/cartReducer";
import { productDetailsReducer } from "../reducers/productDetailsReducer";
import { productListReducer } from "../reducers/productListReducer";
import removeProductReducer from "../reducers/removeProductReducer";
import saveProductReducer from "../reducers/saveProductReducer";
import searchReducer from "../reducers/searchReducer";

const cartItems = Cookie.getJSON("cart") || [];

const reducer = combineReducers({
  listProducts: productListReducer,
  pDetails: productDetailsReducer,
  cart: cartReducer,
  deleteProduct: removeProductReducer,
  newProduct: saveProductReducer,
  searchText: searchReducer,
});
const initialState = { cart: { cartItems } };
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
