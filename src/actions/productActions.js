import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) =>  {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        axios.get("http://127.0.0.1:8000/api/products/")
            .then(response => response.data)
            .then(
                response =>  dispatch({type: PRODUCT_LIST_SUCCESS, payload: response.data})
            );
    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    };
}