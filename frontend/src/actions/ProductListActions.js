
import axios from "axios";

const API_URL = "/api/products/";

//Display a product list by an admin

export const displayProductListByAdmin = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: "DISPLAY_A_PRODUCT_LIST_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.get(API_URL + "admin/productlist", config);

        let data = response.data;

        dispatch({
            type: "DISPLAY_A_PRODUCT_LIST_SUCCESS",
            payload: data
        });



    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DISPLAY_A_PRODUCT_LIST_FAIL",
            payload: message
        })
    };

};

//Add product with an admin role

export const addProductWithAdminRole = (inputData) => async (dispatch, getState) => {

    dispatch({
        type: "ADD_PRODUCT_REQUEST"
    });

    let token = getState().user.user.token;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    };

    let response = await axios.post(API_URL + "admin/productlist", inputData, config);

    let data = response.data;

    dispatch({
        type: "ADD_PRODUCT_SUCCESS",
        payload: data
    })

};

//Get a single product with an admin role

export const getSingleProductWithAdminRole = (productId) => async (dispatch, getState) => {

    try {

    dispatch({
        type: "DISPLAY_SINGLE_PRODUCT_REQUEST"
    });

    let token = getState().user.user.token;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.get(API_URL + "admin/singleproduct/" + productId, config);

    let data = response.data;

    dispatch({
        type: "DISPLAY_SINGLE_PRODUCT_SUCCESS",
        payload: data
    })

    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "DISPLAY_SINGLE_PRODUCT_FAIL",
            payload: message
        })
    }
}; 

//Update a product with an admin role 

export const updateProductWithAdminRole = (productId, inputData) => async (dispatch, getState) => {

    dispatch({
        type: "UPDATE_PRODUCT_BY_ADMIN_REQUEST"
    });

    let token = getState().user.user.token;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    };

    let response = await axios.put(API_URL + "admin/singleproduct/" + productId, inputData, config);

    let data = response.data;

    dispatch({
        type: "UPDATE_PRODUCT_BY_ADMIN_SUCCESS",
        payload: data
    })


};

//Delete a product with an admin role

export const deleteProductWithAdminRole = (productId) => async (dispatch, getState) => {

    let token = getState().user.user.token;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.delete(API_URL + "admin/singleproduct/" + productId, config);

    let data = response.data;

    dispatch({
        type: "DELETE_PRODUCT_BY_ADMIN_SUCCESS",
        payload: data
    })


};

//Reset after adding a product with an admin role

export const resetAfterAddingProduct = () => (dispatch) => {

    dispatch({
        type: "RESET_FUNCTION_AFTER_ADD_PRODUCT"
    });


};