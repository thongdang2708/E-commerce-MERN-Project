
import axios from "axios";

const API_URL = "/api/orders/";


//Update payment

export const updateForPayment = (orderId, inputData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "PAYMENT_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.put(API_URL + "pay/" + orderId, inputData, config);

        let data = response.data;

        dispatch({
            type: "PAYMENT_SUCCESS",
            payload: data.message
        });


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "PAYMENT_FAIL",
            payload: message
        })
    }


};

//Reset for order pay

export const resetForOrderPay = () => (dispatch) => {

    dispatch({
        type: "RESET_PAYMENT"
    })
};