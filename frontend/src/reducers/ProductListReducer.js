

const productListReducer = (state = {productList: [], singleproduct: {}, productListLoading: false, productListError: false, productListSuccess: false, productListMessage: ""}, action) => {

    switch (action.type) {
        case "DISPLAY_A_PRODUCT_LIST_REQUEST":
            return {
                ...state,
                productListLoading: true
            }
        case "DISPLAY_A_PRODUCT_LIST_SUCCESS":
            return {
                ...state,
                productListLoading: false,
                productList: action.payload
            }
        case "DISPLAY_A_PRODUCT_LIST_FAIL":
            return {
                ...state,
                productListLoading: false,
                productListError: true,
                productListMessage: action.payload
            }
        case "ADD_PRODUCT_REQUEST":
            return {
                ...state,
                productListLoading: true
            }
        case "ADD_PRODUCT_SUCCESS":
            return {
                ...state,
                productListLoading: false,
                productListSuccess: true,
                productListMessage: action.payload.message
            }
        case "DISPLAY_SINGLE_PRODUCT_REQUEST":
            return {
                ...state,
                productListLoading: true
            }
        case "DISPLAY_SINGLE_PRODUCT_SUCCESS":
            return {
                ...state,
                productListLoading: false,
                singleproduct: action.payload
            }
        case "DISPLAY_SINGLE_PRODUCT_FAIL":
            return {
                ...state,
                productListLoading: false,
                productListError: true,
                productListMessage: ""
            }
        case "UPDATE_PRODUCT_BY_ADMIN_REQUEST":
            return {
                ...state,
                productListLoading: true
            }
        case "UPDATE_PRODUCT_BY_ADMIN_SUCCESS":
            return {
                ...state,
                productListLoading: false,
                productListSuccess: true,
                productListMessage: action.payload.message
            }
        case "DELETE_PRODUCT_BY_ADMIN_SUCCESS":
            return {
                ...state,
                productList: state.productList.filter((product) => product._id !== action.payload._id)
            }
        case "RESET_FUNCTION_AFTER_ADD_PRODUCT":
            return {
                ...state,
                singleproduct: {},
                productListLoading: false, 
                productListError: false, 
                productListSuccess: false, 
                productListMessage: ""
            }
        default:
            return state
    };

};

export default productListReducer;


