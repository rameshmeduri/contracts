import {
  CREATE_CONTRACT,
  GET_CONTRACTS,
  UPDATE_CONTRACT,
  DELETE_CONTRACT
} from '../actions/types';

const initialState = {
  contractList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTRACTS:
      return {
        ...state,
        contractList: action.payload
      };

    case CREATE_CONTRACT:
      return {
        ...state,
        contractList: [action.payload, ...state.contractList]
      };

    case UPDATE_CONTRACT: {
      const newArr = state.contractList.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return item;
      });

      return {
        ...state,
        contractList: newArr
      };
    }

    case DELETE_CONTRACT: {
      return {
        ...state,
        contractList: state.contractList.filter((o) => o._id !== action.payload)
      };
    }

    default:
      return state;
  }
}
