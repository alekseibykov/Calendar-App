const INITIAL_STATE = { show: null };

export default function ItemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'EXPAND_ITEM':
      const newState = Object.assign({}, state);
      newState.show = action.payload;
      return newState;

      // return {...state, show: action.payload};
    default:
      return state
  }
};
