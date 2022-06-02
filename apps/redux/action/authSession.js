import * as actionType from './actionType';
import auth from '@react-native-firebase/auth';

function setToken(token) {
    return async function (dispatch) {
        dispatch({
            type: actionType.SET_USERTOKEN,
            payload: {
                userToken: token,
            }
        });
    }
}

export function login(email, password) {
    return async function (dispatch) {
        try {
            // Async call to server to retrieve data
            await auth().signInWithEmailAndPassword(email, password);
            // Update to reducer
            // dispatch({
            //     type: actionType.SET_USERTOKEN,
            //     payload: {
            //         userToken: userToken,
            //     }
            // });
        } catch (err) {
            // switch (true) {
            //     case err.message.includes('invalid-email'):
            //         return 'invalid-email';
            //     case err.message.includes('user-not-found'):
            //     case err.message.includes('wrong-password'):
            //         return 'bad-identity';
            //     case err.message.includes('network-request-failed'):
            //         return 'network-issue';
            //     default:
            //         console.log(err)
            //         return 'unhandled-exception';
            // }
        }
    }
}

export function register(email, password) {
    
    try {
        await auth().createUserWithEmailAndPassword(email, password);
        return "OK";
    } catch (err) {
        console.log(err);
    }
}

export function logout() {
    try {
        await auth().signOut();
    } catch (err) {
        console.log(err);
    }
}

export function subscribe() {
    return auth().onAuthStateChanged(setToken);
}

