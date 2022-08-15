
let shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
const shippingAddressReducer = (state = {shippingAddress: shippingAddress ? shippingAddress : {}, shippingIsLoading: false}, action) => {

        switch (action.type) { 
            case "INSERT_SHIPPING_ADDRESS_REQUEST":
                return {
                    ...state,
                    shippingIsLoading: true,
                }
            case "INSERT_SHIPPING_ADDRESS_SUCCESS":
                return {
                    ...state,
                    shippingIsLoading: false,
                    shippingAddress: action.payload
                }
            case "REMOVE_SHIPPING_ADDRESS":
                return {
                    ...state,
                    shippingAddress: {}
                }
            default:
                return state;
        }



};  



export default shippingAddressReducer;