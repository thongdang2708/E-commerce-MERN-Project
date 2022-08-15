
let cart = JSON.parse(localStorage.getItem("cart"));
const cartReducer = (state = {cartItems: cart ? cart : [], isLoadingCart: false, isSuccessCart: false, isErrorCart: false, messageCart: ""}, action) => {

    switch (action.type) {
        case "ADD_TO_CART_REQUEST":
            return {
                ...state,
                isLoadingCart: true
            }
        case "ADD_TO_CART_SUCCESS":
            let singleItem = action.payload;
            
            let existItem = state.cartItems.find((item) => item.product_id === singleItem.product_id);

            if (existItem) {
                return {
                    ...state,
                    isLoadingCart: false,
                    isSuccessCart: true,
                    cartItems: state.cartItems.map((item) => {
                        
                        if (item.product_id === singleItem.product_id && ((item.quantity + singleItem.quantity) <= item.countInStock)) {
                            item.quantity = item.quantity + singleItem.quantity
                        } else if (item.product_id === singleItem.product_id && ((item.quantity + singleItem.quantity) > item.countInStock)) {
                            item.quantity = item.countInStock
                        }

                        return {
                            ...item,
                            quantity: item.quantity
                        }
                    })
                } 

            } else {
                return {
                    ...state,
                    isLoadingCart: false,
                    isSuccessCart: true,
                    cartItems: [singleItem, ...state.cartItems]
                }
            }
        
        case "ADD_TO_CART_FAIL":
            return {
                ...state,
                isErrorCart: true,
                isLoadingCart: false,
                messageCart: action.payload
            } 
        case "CHANGE_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                    if (item.product_id === action.payload.product_id) {
                        item.quantity = action.payload.quantity
                    };

                    return {
                        ...item,
                        quantity: item.quantity
                    }
                })

            }
        case "REMOVE_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product_id !== action.payload.product_id)
            }
        case "REMOVE_SUCCESS":
            return {
                ...state,
                isSuccessCart: false
            }
        case "RESET_FOR_CART":
            return {
                cartItems: [],
                isLoadingCart: false,
                isSuccessCart: false,
                isErrorCart: false,
                messageCart: false
            } 
        default:
            return state
    }
};


export default cartReducer;