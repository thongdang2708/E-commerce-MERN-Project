

import axios from "axios";

const API_URL = "/api/orders/";


//Add Order

export const addOrder = (inputData) => async (dispatch, getState) => {

    try {
    
        dispatch({
            type: "ADD_ORDER_REQUEST",
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.post(API_URL, inputData, config);

        let data = response.data;

        dispatch({
            type: "ADD_ORDER_SUCCESS",
            payload: data
        });


    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "ADD_ORDER_FAIL",
            payload: message
        })
    };
};


//Display single order

export const displaySingleOrder = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "DISPLAY_SINGLE_ORDER_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.get(API_URL + id, config);

        let data = response.data;

        

        dispatch({
            type: "DISPLAY_SINGLE_ORDER_SUCCESS",
            payload: {
                order: data,
                shippingAddress: data.shippingAddress,
                userInfo: data.user,
                orderItems: data.orderItems
            }
        });

        return data;

    


    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DISPLAY_SINGLE_ORDER_FAIL",
            payload: message
        })
    }


};

//Get all orders of a user

export const getAllOrdersOfUser = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: "DISPLAY_ALL_ORDERS_OF_USER_REQUEST"
        });

        let token = getState().user.user.token;
        
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.get(API_URL + "user/all", config);

        let data = response.data;

        dispatch({
            type: "DISPLAY_ALL_ORDERS_OF_USER_SUCCESS",
            payload: data
        });


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DISPLAY_ALL_ORDERS_OF_USER_FAIL",
            payload: message
        })

    };
};  


//Mark an order as delivered by admin

export const markDeliverByAdmin = (orderId) => async (dispatch, getState) => {

    let token = getState().user.user.token;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let inputData = {
        isDelivered: true,
        deliveredAt: Date.now()
    };

    let response = await axios.put(API_URL + "admin/markdeliver/" + orderId, inputData, config);

    let data = response.data;

    dispatch({
        type: "UPDATE_DELIVER_SUCCESS",
        payload: data
    });
    

};




























// export const displaySingleOrder = (id) => async (dispatch, getState) => {

//     try {

//         dispatch({
//             type: "DISPLAY_SINGLE_ORDER_REQUEST"
//         });

//         let token = getState().user.user.token;

//         let config = {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         };

//         let response = await axios.get(API_URL + id, config)
        
//         let data = response.data;

//         dispatch({
//             type: "DISPLAY_SINGLE_ORDER_SUCCESS",
//             payload: data
//         });


//     } catch (error) {

//         let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

//         dispatch({
//             type: "DISPLAY_SINGLE_ORDER_FAIL",
//             payload: message
//         });
//     }

// };

//Reset for placing order

export const resetForOrder = () => (dispatch) => {

    dispatch({
        type: "RESET_FUNCTION_FOR_PLACING_ORDER"
    });
};