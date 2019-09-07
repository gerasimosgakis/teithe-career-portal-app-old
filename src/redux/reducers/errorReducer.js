import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  errors: { message: "" }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: { message: "" }
      };
    default:
      return state;
  }
}
