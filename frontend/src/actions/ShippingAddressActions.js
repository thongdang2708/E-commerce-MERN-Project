

//Insert shipping address
export const addShippingAddress = (inputData) => (dispatch) => {

    dispatch({
        type: "INSERT_SHIPPING_ADDRESS_REQUEST"
    });

    dispatch({
        type: "INSERT_SHIPPING_ADDRESS_SUCCESS",
        payload: inputData
    });

    localStorage.setItem("shippingAddress", JSON.stringify(inputData));

};

//Remove shipping address after logging out

export const removeAddress = () => (dispatch) => {

    dispatch({
        type: "REMOVE_SHIPPING_ADDRESS"
    });
    
    localStorage.removeItem("shippingAddress");

};
// export const removeShippingAddress = () => (dispatch) => {
//     dispatch({
//         type: "REMOVE_SHIPPING_ADDRESS"
//     });

//     localStorage.removeItem("shippingAddress");
// };  