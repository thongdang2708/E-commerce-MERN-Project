
const orderListReducer = (state = {orderList: [], orderListLoading: false, orderListSuccess: false, orderListError: false, orderListMessage: ""}, action) => {
    
    switch (action.type) {
        case "DISPLAY_ORDER_LIST_REQUEST": 
            return {
                ...state,
                orderListLoading: true
            }
        case "DISPLAY_ORDER_LIST_SUCCESS":
            return {
                ...state,
                orderListLoading: false,
                orderList: action.payload
            }
        case "DISPLAY_ORDER_LIST_FAIL":
            return {
                ...state,
                orderListLoading: false,
                orderListError: true,
                orderListMessage: action.payload
            }
        default:
            return state
    }
};

export default orderListReducer;