import axios from "axios";
import React from "react";
import firebase from "../firebase";
import { baseURL } from "api";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  if(!!login && password){
    setError(false);
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(login, password)
      .then((users) => {
        console.log("uid", users.user.uid);
        console.log("Logado com sucesso!");
        localStorage.setItem("id_token", users.user.uid);
        const body = {
          uidUser: users.user.uid,
        };
        axios
          .post(`${baseURL}/registerSession`, body)
          .then((res) => {
            console.log("o que temos", res.data);
            localStorage.setItem("sessionToken", res.data.JWT);
            history.push('/app/indicadores')
            dispatch({type: "LOGIN_SUCCESS" })
          })
          .catch((err) => {
            console.log(err);
            setError(true);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsLoading(false);
      });  
  }else{
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
  
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
