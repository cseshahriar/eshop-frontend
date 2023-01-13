import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from "../constants/orderConstants";
import {
    USER_LOGIN_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";
import {CART_CLEAR_ITEMS} from "../constants/cartConstants";

import {BASE_API_URL} from "../constants/baseConstants";



export const createOrderActions = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `${BASE_API_URL}orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

        // clear state
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        }); // clear the cart
        // remove from local storage
        localStorage.removeItem('cartItems');


    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}