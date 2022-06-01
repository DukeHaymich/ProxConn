import * as actionType from './actionType';

export function setName(name) {
    return async function (dispatch) {
        try {
            // Async call to server to retrieve data

            // Update to reducer
            dispatch({
                type: actionType.SET_USERNAME,
                payload: {
                    name: name,
                }
            });
        } catch (err) {

        }
    }
}

export function setBio(bio) {
    return async function (dispatch) {
        try {
            // Async call to server to retrieve data

            // Update to reducer
            dispatch({
                type: actionType.SET_USERBIO,
                payload: {
                    bio: bio,
                }
            });
        } catch (err) {

        }
    }
}