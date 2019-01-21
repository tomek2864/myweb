import {
  ADD_ARTICLE,
  GET_ARTICLE,
  ARTICLE_LOADING,
  DELETE_ARTICLE
} from "../actions/types";

const initialState = {
  articles: [],
  article: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          article => article._id !== action.payload
        )
      };

    case ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ARTICLE:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [action.payload, ...state.articles]
      };
    default:
      return state;
  }
}
