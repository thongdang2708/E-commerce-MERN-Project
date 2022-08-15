
import axios from "axios";

const API_URL = "/api/users/";

//Display all users with an admin role

export const displayAllUsers = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: "DISPLAY_ALL_USERS_ADMIN_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.get(API_URL + "allusers", config);

        let data = response.data;

        dispatch({
            type: "DISPLAY_ALL_USERS_ADMIN_SUCCESS",
            payload: data
        });


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DISPLAY_ALL_USERS_ADMIN_FAIL",
            payload: message
        })

    };

};

//Delete user with an admin role

export const deleteUserByAdmin = (userId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "DELETE_SINGLE_USER_IN_USERLIST_BY_ADMIN_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.delete(API_URL + "singleuser/" + userId, config);

        let data = response.data;
        
        dispatch({
            type: "DELETE_SINGLE_USER_IN_USERLIST_BY_ADMIN_SUCCESS",
            payload: data
        });


    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DELETE_SINGLE_USER_IN_USERLIST_BY_ADMIN_FAIL",
            payload: message
        })
    }


};




