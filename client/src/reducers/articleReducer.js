import {
  ADD_ARTICLE,
  GET_ARTICLE,
  ARTICLE_LOADING,
  DELETE_ARTICLE,
  GET_ARTICLE_ID,
  GET_ARTICLES
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
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case GET_ARTICLE_ID:
      return {
        ...state,
        article: action.payload,
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
