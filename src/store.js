import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducer
import {
    productListReducer,
    productDetailsReducer
} from './reducers/productReducers';
import {cartReducer} from "./reducers/cartReducers";

// user reducer
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

// cart get from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    cart: {cartItems: cartItemsFromStorage}
};

const middleware = [
    thunk
];

const store = createStore(
    reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;