
let paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
const paymentMethodReducer = (state = {paymentMethod: paymentMethod ? paymentMethod : {}, isLoadingPaymentMethod: false}, action) => {

    switch (action.type) {
        case "ADD_PAYMENT_METHOD_REQUEST":
            return {
                ...state,
                isLoadingPaymentMethod: true
            }
        case "ADD_PAYMENT_METHOD_SUCCESS":
            return {
                ...state,
                isLoadingPaymentMethod: false,
                paymentMethod: action.payload
            }
        case "REMOVE_PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod: {}
            }
        default: 
            return state
    }


};


export default paymentMethodReducer;