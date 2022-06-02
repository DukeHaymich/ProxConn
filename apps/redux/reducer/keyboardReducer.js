import * as actionType from '../action/actionType';

const initialState = {
  flag: false,
};

export default function keyboardReducer(state = initialState, payload) {
  switch (payload.type) {
    case actionType.SETFLAG: {
      return {
        ...state,
        flag: payload.flag,
      };
    }
    default: {
      return state;
    }
  }
}
