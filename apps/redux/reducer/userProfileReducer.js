import * as actionType from "../action/actionType";


const initialState = {
    id: "abcXYZ",
    name: "John Doe",
    bio: "",
}

export default function userProfileReducer(state = initialState, action) {
    switch(action.type) {
        case actionType.SET_USERNAME: {
            return {
                ...state,
                name: action.payload.name,
            }
        }
        case actionType.SET_USERBIO: {
            return {
                ...state,
                bio: action.payload.bio,
            }
        }
        default: {
            return state;
        }   
    }
}