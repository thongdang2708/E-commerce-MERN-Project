

const singleUserReducer = (state = {singleUser: {}, singleUserLoading: false, singleUserError: false, singleUserSuccess: false, singleUserMessage: false}, action) => {

    switch (action.type) {

        case "DISPLAY_SINGLE_USER_BY_ADMIN_REQUEST":
            return {
                ...state,
                singleUserLoading: true
            }
        case "DISPLAY_SINGLE_USER_BY_ADMIN_SUCCESS":
            return {
                ...state,
                singleUserLoading: false,
                singleUser: action.payload
            }
        case "DISPLAY_SINGLE_USER_BY_ADMIN_FAIL":
            return {
                ...state,
                singleUserLoading: false,
                singleUserError: true,
                singleUserMessage: action.payload
            }
        case "UPDATE_USER_BY_ADMIN_REQUEST":
            return {
                ...state,
                singleUserLoading: true
            }
        case "UPDATE_USER_BY_ADMIN_SUCCESS":
            return {
                ...state,
                singleUserLoading: false,
                singleUserSuccess: true,
                singleUserMessage: action.payload.message
            }
        case "UPDATE_USER_BY_ADMIN_FAIL":
            return {
                ...state,
                singleUserLoading: false,
                singleUserError: true,
                singleUserMessage: action.payload
            }
        case "RESET_SINGLE_USER_BY_ADMIN":
            return {
                ...state,
                singleUserLoading: false,
                singleUserError: false, 
                singleUserSuccess: false, 
                singleUserMessage: false
            }
        default:
            return state
    };


};

export default singleUserReducer;




