import * as actionType from "../action/actionType";


const initialState = {
    userToken: null,
    subscriber: null,
}

export default function authSessionReducer(state = initialState, action) {
    switch(action.type) {
        case actionType.SET_USERTOKEN: {
            return {
                ...state,
                userToken: action.payload.userToken,
            }
        }
        case actionType.SET_SUBSCRIBER: {
            return {
                ...state,
                subscriber: action.payload.subscriber,
            }
        }
        default: {
            return state;
        }   
    }
}