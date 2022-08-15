

const usersReducer = (state = {users: [], usersLoading: false, usersError: false, usersSuccess: false, usersMessage: ""}, action) => {

    switch (action.type) {

        case "DISPLAY_ALL_USERS_ADMIN_REQUEST":
            return {
                ...state,
                usersLoading: true
            }
        case "DISPLAY_ALL_USERS_ADMIN_SUCCESS":
            return {
                ...state,
                usersLoading: false,
                users: action.payload
            }
        case "DISPLAY_ALL_USERS_ADMIN_FAIL":
            return {
                ...state,
                usersLoading: false,
                usersError: true,
                usersMessage: action.payload
            }
        case "DELETE_SINGLE_USER_IN_USERLIST_BY_ADMIN_REQUEST":
            return {
                ...state,
                usersLoading: true
            }
        case "DELETE_SINGLE_USER_IN_USERLIST_BY_ADMIN_SUCCESS":
            return {
                ...state,
                usersLoading: false,
                users: state.users.filter((user) => user._id !== action.payload.singleuser._id)
            }
        case "DELETE_SINGLE_USER_IN_USERLIST_BY_ADMIN_FAIL":
            return {
                ...state,
                usersLoading: false,
                usersError: true,
                usersMessage: action.payload
            }
        default:
            return state
    }



};

export default usersReducer;