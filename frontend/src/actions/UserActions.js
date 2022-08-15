
import axios from "axios";

const API_URL = "/api/users/";

//Register

export const register = (inputData) => async (dispatch) => {

    try {

        dispatch({
            type: "REGISTER_REQUEST"
        });

        let response = await axios.post(API_URL, inputData);

        let data = response.data;

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: data
        })

    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "REGISTER_FAIL",
            payload: message
        })
    }
};

//Function to login

export const login = (inputData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "LOG_IN_REQUEST"
        });

        let response = await axios.post(API_URL + "login", inputData);

        let data = response.data;

        dispatch({
            type: "LOG_IN_SUCCESS",
            payload: data
        });

        localStorage.setItem("user", JSON.stringify(getState().user.user));


    } catch (error) {


        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "LOG_IN_FAIL",
            payload: message
        })
    }

};


//Function to log out

export const logout = () => (dispatch) => {

    dispatch({
        type: "LOG_OUT"
    });

    localStorage.removeItem("user");

};

//Select user to edit info

export const userInfoToEdit = (inputData) => (dispatch) => {

    dispatch({
        type: "INFO_TO_EDIT",
        payload: inputData
    })

};

//Edit user's information

export const editUserInfo = (inputData) => async (dispatch, getState) => {

    try {

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

       let response = await axios.put(API_URL + "update", inputData, config);

       let data = response.data;

       dispatch({
           type: "EDIT_USER",
           payload: {
               name: data.name,
               email: data.email,
                token: token
           }
       });

       localStorage.setItem("user", JSON.stringify(getState().user.user));
        
    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "EDIT_USER_FAIL",
            payload: message
        })
    }
    


};

//Update password

export const updatePassword = (inputData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "UPDATE_PASSWORD_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.post(API_URL + "updatepassword", inputData, config);

        let data = response.data;

        dispatch({
            type: "UPDATE_PASSWORD_SUCCESS",
            payload: data
        });
        

    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "UPDATE_PASSWORD_FAIL",
            payload: message
        })
    }
};

//Reset users' info to edit

export const resetForUserInfoToEdit = () => (dispatch) => {

    dispatch({
        type: "RESET_INFO_TO_EDIT"
    })

};


//Function to reset

export const resetFunction = () => (dispatch) => {

    dispatch({
        type: "RESET_FUNCTION"
    })
};

//Function to reset for log in

export const resetFunctionForLogIn = () => (dispatch) => {

    dispatch({
        type: "RESET_FUNCTION_FOR_LOGIN"
    })
};

