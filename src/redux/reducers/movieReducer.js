import Actions from "../actionTypes";

const initialState = {
    isLoading: false,
    error:null,
    movies: []
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.MOVIES_LOADING:
      return {...state, isLoading:true};

    case Actions.MOVIES_ERROR:
      return {...state, isLoading:false, error: payload};

    case Actions.MOVIES_SUCCES:
      return {...state, isLoading:false, error:null, movies:payload};

    default:
      return state;
  }
};

export default movieReducer
