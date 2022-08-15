
import axios from "axios";


const API_URL = "/api/orders/";

//Display an order list with an admin role

export const displayOrderListByAdmin = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: "DISPLAY_ORDER_LIST_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.get(API_URL + "admin/orderlist", config);

        let data = response.data;

        dispatch({
            type: "DISPLAY_ORDER_LIST_SUCCESS",
            payload: data
        })



    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DISPLAY_ORDER_LIST_FAIL",
            payload: message
        })
    }


};