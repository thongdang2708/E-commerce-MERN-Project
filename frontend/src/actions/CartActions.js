
import axios from "axios";

const API_URL = "/api/products/"


//Add Products To Cart

export const addToCart = (productId, quantity) => async (dispatch, getState) => {

    try {

        dispatch({
            type: "ADD_TO_CART_REQUEST",
        });

        let response = await axios.get(API_URL + productId);

        let data = await response.data;

        dispatch({
            type: "ADD_TO_CART_SUCCESS",
            payload: {
                product_id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity: Number(quantity)
            }
        });
        
        localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "ADD_TO_CART_FAIL",
            payload: message
        })

    }

};

//Function to change quantity

export const changeQuantity = (id, quantity) => (dispatch, getState) => {

    let data = {
        product_id: id,
        quantity: Number(quantity)
    };

    dispatch({
        type: "CHANGE_QUANTITY",
        payload: data
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));

};

//Function to remove product out of cart when quantity is 0

export const removeItem = (id) => (dispatch, getState) => {

    let data = {
        product_id: id
    };

    dispatch({
        type: "REMOVE_ITEM",
        payload: data
    });


    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));


};

//Function to reset cart after placing order 

export const resetCart = () => (dispatch) => {

    dispatch({
        type: "RESET_FOR_CART"
    });

    localStorage.removeItem("cart");
};

//Remove success when adding to cart successfully

export const removeSuccess = () => (dispatch) => {

    dispatch({
        type: "REMOVE_SUCCESS"
    })

};


