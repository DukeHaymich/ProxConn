import * as actionType from "../action/actionType";


const initialState = {
    userToken: null,
}

export default function authSessionReducer(state = initialState, action) {
    switch(action.type) {
        case actionType.SET_USERTOKEN: {
            return {
                ...state,
                userToken: action.payload.userToken,
            }
        }
        default: {
            return state;
        }   
    }
}