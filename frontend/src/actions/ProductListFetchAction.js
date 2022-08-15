
import axios from "axios";

const API_URL = "/api/products/";


//Display Latest Products

export const displayProducts = () => async (dispatch) => {

    try {

        dispatch({
            type: "PRODUCT_LIST_REQUEST"
        });

        let response = await axios.get(API_URL);

        let data = response.data;

        dispatch({
            type: "PRODUCT_LIST_SUCCESS",
            payload: data
        })


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "PRODUCT_LIST_FAIL",
            payload: message
        })

    }
};

//Display Single Product

export const displaySingleProduct = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "SINGLE_PRODUCT_REQUEST"
        });

        let response = await axios.get(API_URL + id);

        let data = response.data;

        dispatch({
            type: "SINGLE_PRODUCT_SUCCESS",
            payload: data
        })


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "SINGLE_PRODUCT_FAIL",
            payload: message
        })


    }


};



