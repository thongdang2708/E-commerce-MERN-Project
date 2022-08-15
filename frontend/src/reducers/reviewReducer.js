
const reviewReducer = (state = {reviews: [], isLoadingReview: false, isErrorReview: false, isSuccessReview: false, messageReview: ""}, action) => {

    switch (action.type) {
        case "GET_REVIEWS_REQUEST":
            return {
                ...state,
                isLoadingReview: true
            }
        case "GET_REVIEWS_SUCCESS":
            return {
                ...state,
                isLoadingReview: false,
                reviews: action.payload
            }
        case "GET_REVIEWS_FAIL":
            return {
                ...state,
                isLoadingReview: false,
                messageReview: action.payload,
                isErrorReview: true
            }
        case "ADD_REVIEW_REQUEST":
            return {
                ...state,
                isLoadingReview: true
            }
        case "ADD_REVIEW_SUCCESS":
            return {
                ...state,
                isLoadingReview: false,
                reviews: [action.payload,...state.reviews]
            }
        case "ADD_REVIEW_FAIL":
            return {
                ...state,
                isLoadingReview: false,
                isErrorReview: true,
                messageReview: action.payload
            }
        default:
            return state;
    }

};

export default reviewReducer;