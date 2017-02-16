import {
  CLIENTS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENTS_FETCH_SUCCESS:
      // REVIEW: the simplicity of this reducer helps us get away with a Lot here, but for more extensive projects,
      // naming the key here in the return is important.
      return action.payload;
    default:
      return state;
  }
};
