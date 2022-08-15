
import axios from "axios";

const API_URL = "/api/users/";

//Display single user with an admin role

export const displaySingleUserByAdmin = (userId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "DISPLAY_SINGLE_USER_BY_ADMIN_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };


        let response = await axios.get(API_URL + "singleuser/" + userId, config);
        
        let data = response.data;

        dispatch({
            type: "DISPLAY_SINGLE_USER_BY_ADMIN_SUCCESS",
            payload: data
        });



    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DISPLAY_SINGLE_USER_BY_ADMIN_FAIL",
            payload: message
        })

    }


};

//Update a single user with an admin role

export const updateUserByAdminRole = (userId, inputData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "UPDATE_USER_BY_ADMIN_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.put(API_URL + "singleuser/" + userId, inputData, config);

        let data = response.data;

        dispatch({
            type: "UPDATE_USER_BY_ADMIN_SUCCESS",
            payload: data
        });


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "UPDATE_USER_BY_ADMIN_FAIL",
            payload: message
        })
    }
};

//Reset single user by admin

export const resetSingleUserByAdmin = () => (dispatch) => {

    dispatch({
        type: "RESET_SINGLE_USER_BY_ADMIN"
    });

};