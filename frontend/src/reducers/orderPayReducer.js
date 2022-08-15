
const orderPayReducer = (state = {isLoadingPay: false, isErrorPay: false, isSuccessPay: false, messagePay: ""}, action) => {

    switch (action.type) {

        case "PAYMENT_REQUEST":
            return {
                ...state,
                isLoadingPay: true
            }
        case "PAYMENT_SUCCESS":
            return {
                ...state,
                isLoadingPay: false,
                isSuccessPay: true,
                messagePay: action.payload
            }
        case "PAYMENT_FAIL":
            return {
                ...state,
                isLoadingPay: false,
                isErrorPay: true,
                messagePay: action.payload
            }
        case "RESET_PAYMENT":
            return {
                isLoadingPay: false, 
                isErrorPay: false, 
                isSuccessPay: false,
                messagePay: ""
            }

        default:
            return state
    }

};

export default orderPayReducer;









