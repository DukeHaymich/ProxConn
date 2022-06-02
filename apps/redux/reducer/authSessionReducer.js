import * as actionType from "../action/actionType";


const initialState = {
    userToken: null,
    warning: null,
}

export default function authSessionReducer(state = initialState, action) {
    switch(action.type) {
        case actionType.SET_USERTOKEN: {
            return {
                ...state,
                userToken: action.payload.userToken,
            }
        }
        case actionType.SET_WARNING: {
            return {
                ...state,
                warning: action.payload.warning,
            }
        }
        default: {
            return state;
        }   
    }
}