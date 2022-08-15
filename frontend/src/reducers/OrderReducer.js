
const orderReducer = (state = {orders: [], order: {}, shippingAddressInfo: {}, userInfo: {}, numItems: [], isLoadingOrder: false, isErrorOrder: false, isSuccessOrder: false, messageOrder: ""}, action) => {

    switch (action.type) {
        case "ADD_ORDER_REQUEST":
            return {
                ...state,
                isLoadingOrder: true
            }
        case "ADD_ORDER_SUCCESS":
            return {
                ...state,
                isLoadingOrder: false,
                isSuccessOrder: true,
                order: action.payload
            }
        case "ADD_ORDER_FAIL":
            return {
                ...state,
                isLoadingOrder: false,
                isErrorOrder: true,
                messageOrder: action.payload
            }
        case "DISPLAY_SINGLE_ORDER_REQUEST":
            return {
                ...state,
                isLoadingOrder: true
            }
        case "DISPLAY_SINGLE_ORDER_SUCCESS":
            return {
                ...state,
                isLoadingOrder: false,
                order: action.payload.order,
                shippingAddressInfo: action.payload.shippingAddress,
                userInfo: action.payload.userInfo,
                numItems: action.payload.orderItems
            }
        case "DISPLAY_SINGLE_ORDER_FAIL":
            return {
                ...state,
                isLoadingOrder: false,
                isErrorOrder: true,
                messageOrder: action.payload
            }
        case "DISPLAY_ALL_ORDERS_OF_USER_REQUEST":
            return {
                ...state,
                isLoadingOrder: true
            }
        case "DISPLAY_ALL_ORDERS_OF_USER_SUCCESS":
            return {
                ...state,
                isLoadingOrder: false,
                orders: action.payload
            }
        case "DISPLAY_ALL_ORDERS_OF_USER_FAIL":
            return {
                ...state,
                isLoadingOrder: false,
                isErrorOrder: true,
                messageOrder: action.payload
            }
        case "UPDATE_DELIVER_SUCCESS":
            return {
                ...state,
                order: action.payload,
                shippingAddressInfo: action.payload.shippingAddress,
                userInfo: action.payload.user,
                numItems: action.payload.orderItems
            }
        case "RESET_FUNCTION_FOR_PLACING_ORDER":
            return {
                order: {}, 
                isLoadingOrder: false,
                isErrorOrder: false,
                isSuccessOrder: false,
                messageOrder: "",
                shippingAddressInfo: {}, 
                userInfo: {},
                orders: [],
                numItems: []
            }
        default:
            return state
    };
};

export default orderReducer;