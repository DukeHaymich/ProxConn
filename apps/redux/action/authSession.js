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

export function setWarning(text) {
    return async function (dispatch) {
        dispatch({
            type: actionType.SET_WARNING,
            payload: {
                warning: text,
            }
        });
    }
}

export function setOnboarding(flag) {
    return async function (dispatch) {
        dispatch({
            type: actionType.SET_ONBOARDING,
            payload: {
                onboarding: flag,
            }
        });
    }
}

export function login(email, password) {
    return async function (dispatch) {
        if (email === "") {
            dispatch(setWarning("Email cannot be blank!"));
            return;
        }
        if (password === "") {
            dispatch(setWarning("Password cannot be blank!"));
            return;
        }
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
            dispatch(setWarning(""));
            // console.log('login success');
        } catch (err) {
            switch (true) {
                case err.message.includes('invalid-email'):
                    dispatch(setWarning("Invalid email format!"));
                    break;
                case err.message.includes('user-not-found'):
                case err.message.includes('wrong-password'):
                    dispatch(setWarning("The email/password combination is not found!"));
                    break;
                case err.message.includes('network-request-failed'):
                    dispatch(setWarning("Failed to connect to server (network issue)!"));
                    break;
                default:
                    console.log(err)
                    dispatch(setWarning("Unhandled exception! Contact developers for details."));
            }
            // console.log(err)
        }
    }
}

import firestore from '@react-native-firebase/firestore';

export function register(email, password, name) {
    return async function (dispatch) {
        try {
            const userCred=await auth().createUserWithEmailAndPassword(email, password);
            // firestore().collection('users').set(,)
            
            // console.log('register success');
            dispatch(setWarning(""));
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