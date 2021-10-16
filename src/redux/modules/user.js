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
const getUser = createAction(GET_USER, (userId, userInfo) => ({
  userId,
  userInfo,
}));

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
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch(signIn(userId, token));
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const userCheckAPI = token => {
  return function (dispatch, getState, { history }) {
    apis.userCheck().then(res => {
      const userId = res.data.user.userId;
      const user = res.data.user;
      dispatch(getUser(userId, user));
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
        draft.user = action.payload.userId;
        draft.userInfo = action.payload.userInfo;
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
