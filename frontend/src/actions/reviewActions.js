
import axios from "axios";

const API_URL = "/api/products/";

//Get reviews for a single product

export const displayReviews = (productId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "GET_REVIEWS_REQUEST"
        });

        let response = await axios.get(API_URL + productId + "/reviews");

        let data = response.data;

        dispatch({
            type: "GET_REVIEWS_SUCCESS",
            payload: data
        });

    } catch (error) {
        let message = (error.response || error.response.data || error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "GET_REVIEWS_FAIL",
            payload: message
        })

    }

};

//Add review

export const addReview = (productId, inputData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "ADD_REVIEW_REQUEST"
        });

        let token = getState().user.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };


        let response = await axios.post(API_URL + productId + "/reviews", inputData, config);

        let data = response.data;

        dispatch({
            type: "ADD_REVIEW_SUCCESS",
            payload: data
        });




    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "ADD_REVIEW_FAIL",
            payload: message
        })

    }

};