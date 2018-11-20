import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) //przekierowanie dodac do login page
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Zapis tokenu do localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token); // tylko zapis stringów
      //Dodac header autoryzacji
      setAuthToken(token);
      // Decode tokenu
      const decoded = jwt_decode(token);
      //Ustawienie uzytkownika aktualnie zalogowanego
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Ustawienie zalogowowanego uzytkownika
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
