import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";
import {PRODUCT_DETAILS_REQUEST} from "../constants/productConstants";

export const addToCart = (id, qty) => async (dispatch, getState) =>{
    const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
        .then(response => response);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product:data._id,
            name:data.name,
            image_url: data.image_url,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState.cart.cartItems));
}