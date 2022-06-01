import { combineReducers } from 'redux';

import userProfile from './userProfileReducer';

const reducers = combineReducers({
    userProfile: userProfile,
    // add reducer here
});

export default (state, action) => reducers(state, action);

