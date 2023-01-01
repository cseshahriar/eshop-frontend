import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducer
import {
    productListReducer,
    productDetailsReducer
} from './reducers/productReducers';
import {cartReducer} from "./reducers/cartReducers";
import {userLoginReducer, userRegisterReducer} from  './reducers/userReducers';

// user reducer
const reducer = combineReducers({
    // product
    productList: productListReducer,
    productDetails: productDetailsReducer,
    // cart
    cart: cartReducer,
    // user
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

// cart get from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [
    thunk
];

const store = createStore(
    reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;