import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../common/axios";

// const baseURL = "http://3.34.90.85:3000/";

const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const GET_USER = "GET_USER";

const signIn = createAction(SIGN_IN, token => ({ token }));
const signOut = createAction(SIGN_OUT);
const getUser = createAction(GET_USER, user => ({ user }));

const initialState = {
  user: null,
  token: null,
  is_login: false,
};

const signUpAPI = (userId, password, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    console.log(userId, password, confirmPassword);

    const data = {
      userId: userId,
      password: password,
      confirmPassword: confirmPassword,
    };

    apis
      .signUp(data)
      .then(res => {
        console.log(res);
        // const token = res.data.token;
        // localStorage.setItem("token", token);
        history.push("/signIn");
      })
      .catch(err => console.log(err));

    // axios({
    //   method: "POST",
    //   url: "/user/signUp",
    //   data,
    // })
    //   .then(res => {
    //     console.log(res); // signup 정보 확인
    //     window.alert("축하합니다");
    //     history.push("/login");
    //   })
    //   .catch(err => {
    //     console.log("signupAPI에서 오류발생", err);
    //     window.alert("회원가입에 실패했습니다.");
    //   });
  };
};

const signInAPI = (userId, password) => {
  return function (dispatch, getState, { history }) {
    const data = {
      userId,
      password,
    };

    apis
      .signIn(data)
      .then(res => {
        console.log(res);
        const token = res.data.token;
        localStorage.setItem("token", token);
        history.push("/");
        dispatch(signIn(token));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const signOutAPI = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    localStorage.clear();
    history.push("/signin");
    dispatch(signOut());
  };
};

const userCheckAPI = token => {
  return function (dispatch, getState, { history }) {
    apis.userCheck().then(res => {
      console.log(res);
      const user = res.data.user.userId;
      dispatch(getUser(user));
    });
  };
};

export default handleActions(
  {
    [SIGN_IN]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user;
        draft.token = action.payload.token;
        draft.is_login = true;
      }),
    [SIGN_OUT]: (state, action) =>
      produce(state, draft => {
        draft.user = null;
        draft.token = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user;
        draft.token = localStorage.getItem("token");
        draft.is_login = true;
      }),
  },
  initialState
);

const userActions = {
  signInAPI,
  signUpAPI,
  signOutAPI,
  userCheckAPI,
};

export { userActions };
