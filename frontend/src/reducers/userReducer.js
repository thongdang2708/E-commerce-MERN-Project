
let user = JSON.parse(localStorage.getItem("user"));
const userReducer = (state = {user: user ? user : null, editUser: {info: {}, edit: false}, isLoading: false, isError: false, isSuccess: false, message: ""}, action) => {

    switch (action.type) {
        case "REGISTER_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: action.payload
            }
        case "REGISTER_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload,
                user: null
            }
        case "LOG_IN_REQUEST":
            return {
                ...state,
                isLoading: true,
            }
        case "LOG_IN_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: action.payload,
                editUser: {
                    info: {},
                    edit: false
                }
            }
        case "LOG_IN_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload,
                user: null
            }
        case "LOG_OUT":
            return {
                ...state,
                user: null
            }
        case "INFO_TO_EDIT":
            return {
                ...state,
                editUser: {
                    info: action.payload,
                    edit: true
                }
            }
        case "EDIT_USER":
            return {
                ...state,
                user: action.payload
            }
        case "EDIT_USER_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload,
                isLoading: false
            }
        case "UPDATE_PASSWORD_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "UPDATE_PASSWORD_SUCCESS":
            return {
                ...state,
                isLoading: false,
                message: action.payload.message,
                isSuccess: true
            }
        case "UPDATE_PASSWORD_FAIL":
            return {
                ...state,
                isLoading: false,
                message: action.payload,
                isError: true
            }
        case "RESET_INFO_TO_EDIT":
            return {
                ...state,
                editUser: {
                    info: {},
                    edit: false
                }
            }
        case "RESET_FUNCTION":
            return {
                user: null, 
                isLoading: false, 
                isError: false, 
                isSuccess: false, 
                isError: false, 
                message: ""
            }
        case "RESET_FUNCTION_FOR_LOGIN":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: false,
                message: ""
            }
        default:
            return state
    }
};

export default userReducer;