import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducer
import {
    productListReducer,
    productDetailsReducer
} from './reducers/productReducers';
import {cartReducer} from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
    userListReducer
} from './reducers/userReducers';

import {
    orderCreateReducer,
    orderDetailReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from "./reducers/orderReducers";

// user reducer
const reducer = combineReducers({
    // product
    productList: productListReducer,
    productDetails: productDetailsReducer,

    // cart
    cart: cartReducer,

    // order
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,

    // user
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
});

// cart get from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const savePaymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: savePaymentMethodFromStorage,
    },
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