import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../common/axios";

// const baseURL = "http://3.34.90.85:3000/";

const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const GET_USER = "GET_USER";

const signIn = createAction(SIGN_IN, (userId, token) => ({ userId, token }));
const signOut = createAction(SIGN_OUT);
const getUser = createAction(GET_USER, user => ({ user }));

const initialState = {
  user: null,
  userInfo: null,
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
        history.push("/signIn");
      })
      .catch(err => {
        console.log(err);
        alert("입력 정보를 확인하세요.");
      });
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
        const token = res.data.token;
        localStorage.setItem("token", token);
        apis.userCheck().then(res => {
          console.log(localStorage.getItem("token"));
          const user = res.data.user;
          dispatch(signIn(userId, token));
          dispatch(getUser(user));
          history.push("/");
        });
      })
      .catch(err => {
        alert("아이디/비밀번호가 올바르지 않습니다.");
        console.log(err);
      });
  };
};

const userCheckAPI = () => {
  return function (dispatch, getState, { history }) {
    apis.userCheck().then(res => {
      const user = res.data.user;
      dispatch(getUser(user));
    });
  };
};

const signOutAPI = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    localStorage.clear();
    dispatch(signOut());
    history.push("/signin");
  };
};

export default handleActions(
  {
    [SIGN_IN]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.userId;
        draft.token = action.payload.token;
        draft.is_login = true;
      }),

    [SIGN_OUT]: (state, action) =>
      produce(state, draft => {
        draft.user = null;
        draft.token = null;
        draft.userInfo = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user;
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
