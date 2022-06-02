import * as actionType from './actionType';

export function setFlag(flag) {
  return async function (dispatch) {
    try {
      // Async call to server to retrieve data

      // Update to reducer
      dispatch({
        type: actionType.SETFLAG,
        payload: {
          flag: flag,
        },
      });
    } catch (err) {}
  };
}
