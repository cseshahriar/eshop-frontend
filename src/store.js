import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducer
import {
    productListReducer,
    productDetailsReducer
} from './reducers/productReducers';

// user reducer
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
});

const initialState = [];

const middleware = [
    thunk
];

const store = createStore(
    reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;