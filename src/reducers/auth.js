
const initalState = {
    uid: null,
    error: '',
    name: '',
    flag: '',
    signupError: '',
    profileComplete: false,
};

const authReducer = (state = {...initalState}, action) =>{
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                uid: action.uid
            };
        case "LOGOUT":
            return{};
        case "GET_INFO":
            return{
                ...state,
                name: action.name,
                flag: action.flag,
                profileComplete: action.profileComplete
            };
        case "SIGNUP":
            return{
                ...state,
                name: action.name,
                flag: action.flag,
                profileComplete: action.profileComplete,
            };
        case "SIGNUP_ERROR":
            return{
                ...state,
                signupError: action.signupError,
            };
        case "ERROR":
            return{
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default authReducer;