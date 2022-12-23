// state values that contain your app's data
//  action objects that describe what happens in your app
// reducer functions that calculate updated state based on existing state and actions
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST :
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS :
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL :
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}