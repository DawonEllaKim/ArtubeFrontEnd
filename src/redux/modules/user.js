// AXIOS
import axios from "axios";

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const baseURL = "http://3.34.90.85";

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const logIn = createAction(LOG_IN, token => ({ token }));
const logout = createAction(LOG_OUT);

const initialState = {
  token: null,
  is_login: false,
};

const signupAPI = (userId, password, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    console.log(userId, password, confirmPassword);
    //수창님 버전
    axios({
      method: "post",
      url: "http://3.34.90.85/user/signUp",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json;charset=UTF-8",
      //   "Access-Control-Allow-Origin": "*",
      // },
      data: {
        userId: userId,
        password: password,
        confirmPassword: confirmPassword,
      },
    })
      .then(res => {
        console.log(res); // signup 정보 확인
        window.alert("축하합니다");
        history.push("/signin");
      })
      .catch(err => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("회원가입에 실패했습니다.");
      });

    //fetch버전
    // axios({
    //   method: "post",
    //   url: "http://3.34.90.85/user/signUp",
    //   data: {
    //     userId: userId,
    //     password: password,
    //     confirmPassword: confirmPassword,
    //   },
    // })
    //   .then(() => {
    //     window.alert("회원가입을 축하드립니다!");
    //     history.push("/login");
    //   })
    //   .catch(err => {
    //     console.log("회원가입 에러", err);
    //   });

    // 일반버전
    axios
      .post("http://3.34.90.85/user/signUp", {
        userId: userId,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then(res => console.log(res));
  };
};

const loginAPI = (username, password) => {
  return function (dispatch, getState, { history }) {};
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, draft => {
        localStorage.removeItem("user_name");
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const userActions = {
  loginAPI,
  signupAPI,
  logout,
};

export { userActions };
