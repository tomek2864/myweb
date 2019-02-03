import axios from "axios";
import {
  ADD_ARTICLE,
  GET_ERRORS,
  GET_ARTICLE,
  ARTICLE_LOADING,
  DELETE_ARTICLE,
  CLEAR_ERRORS,
  GET_ARTICLE_ID
} from "../actions/types";

export const addArticle = articleData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("api/articles", articleData)
    .then(res =>
      dispatch({
        type: ADD_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getArticle = () => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get("api/articles")
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE,
        payload: null
      })
    );
};

// Get article by id
export const getArticleByID = id => dispatch => {
  dispatch(setArticleLoading());
  axios
    .get(`api/articles/${id}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICLE_ID,
        payload: null
      })
    );
};

//Loading
export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};

export const deleteArticle = id => dispatch => {
  if (window.confirm("Jesteś pewien że chcesz usunąć artykuł?")) {
    axios
      .delete(`/api/articles/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_ARTICLE,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
