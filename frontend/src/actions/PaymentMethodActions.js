

//Add payment method

export const addPaymentMethod = (inputData) => (dispatch, getState) => {

    dispatch({
        type: "ADD_PAYMENT_METHOD_REQUEST"
    });

    dispatch({
        type: "ADD_PAYMENT_METHOD_SUCCESS",
        payload: inputData
    });

    localStorage.setItem("paymentMethod", JSON.stringify(getState().paymentMethod.paymentMethod));

};

//Remove payment method when logging out

export const removePaymentMethod = () => (dispatch) => {

    dispatch({
        type: "REMOVE_PAYMENT_METHOD"
    });

    localStorage.removeItem("paymentMethod");
};