
const productReducer = (state = {products: [], product: {}, isError: false, isSuccess: false, isLoading: false, message: ""}, action) => {

    switch (action.type) {

        case "PRODUCT_LIST_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "PRODUCT_LIST_SUCCESS":
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                isSuccess: true
                
            }
        case "PRODUCT_LIST_FAIL":
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                isError: true
            }
        case "SINGLE_PRODUCT_REQUEST": 
            return {
                ...state,
                isLoading: true
            }
        case "SINGLE_PRODUCT_SUCCESS":
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                isSuccess: true
            }
        case "SINGLE_PRODUCT_FAIL":
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                isError: true
            }
        default:
            return state
    }
};

export default productReducer;


