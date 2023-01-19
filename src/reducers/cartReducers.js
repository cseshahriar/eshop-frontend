import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_SHIPPING_ADDRESS_RESET,
    CART_SAVE_PAYMENT_METHOD_RESET,
    CART_CLEAR_ITEMS
} from "../constants/cartConstants";

export const cartReducer = (
    state={
        cartItems: [],
        shippingAddress: {}
    }, action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(el => el.product === item.product)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(el =>
                        el.product === existItem.product ? item : el
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] // add new item
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(el => el.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload}
            return {...state, shippingAddress: action.payload}

        case CART_SAVE_PAYMENT_METHOD_RESET:
            return {...state, shippingAddress: {}}

        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload}

        case  CART_CLEAR_ITEMS:
            return {...state, cartItems: []};

        default:
            return state;
    }

}