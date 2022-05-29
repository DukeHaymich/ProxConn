// export const CAP-

const initialState = {
    id: 'abcXYZ',
    name: 'John Doe',
}

export default function infoReducer(state = initialState, payload) {
    switch(payload.type) {
        case 'UPDATE-NAME': {
            return {
                ...state,
                name: payload.name
            }
        }
        default: {
            return state;
        }   
    }
}