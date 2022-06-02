import {combineReducers} from 'redux';

import keyboardFlag from './keyboardReducer';

const reducers = combineReducers({
  keyboardFlag: keyboardFlag,
  // add reducer here
});

export default (state, action) => reducers(state, action);
