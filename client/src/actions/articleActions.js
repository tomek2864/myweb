import axios from "axios";
import { ADD_ARTICLE, GET_ERRORS } from "../actions/types";

export const addArticle = articleData => dispatch => {
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
