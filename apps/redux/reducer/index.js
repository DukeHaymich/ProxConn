import {combineReducers} from 'redux';

import keyboardFlag from './keyboardReducer';

import userProfile from './userProfileReducer';
import authSession from './authSessionReducer';

const reducers = combineReducers({
    userProfile: userProfile,
    authSession: authSession,
    // add reducer here
});

export default (state, action) => reducers(state, action);
