import * as actionType from './actionType';
import auth from '@react-native-firebase/auth';

export function setToken(token) {
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
            console.log('login success');
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
            console.log(err)
        }
    }
}

export function register(email, password) {
    return async function (dispatch) {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            // console.log('register success');
        } catch (err) {
            console.log(err);
        }
    }
}

export function logout() {
    return async function (dispatch) {
        try {
            await auth().signOut();
            // console.log('logout success');
        } catch (err) {
            console.log(err);
        }
    }
}