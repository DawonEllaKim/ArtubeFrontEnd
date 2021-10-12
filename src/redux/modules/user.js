import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, user => ({ user }));
const logout = createAction(LOG_OUT, user => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const signupMilddleware = user => {
  return function (dispatch) {
    apis
      .signin(user)
      .then(res => {
        if (res.result === "success") {
          localStorage.setItem("token", res.token);
          dispatch(setUser(user));
        } else {
          console.log(res.errorMessage);
        }
      })
      .catch(err => {
        console.log(err, "회원가입 안됨");
      });
  };
};

const loginMiddleware = (id, pwd) => {
  return function (dispatch) {
    apis
      .login(id, pwd)
      .then(res => {
        if (res.result === "success") {
          localStorage.setItem("token", res.token);
          // dispatch(setUser(user));
        } else {
          console.log(res.errorMessage);
        }
      })
      .catch(err => {
        console.log(err, "로그인 안됨");
      });
  };
};

const logoutMiddleware = () => {
  return function (dispatch) {
    apis
      .logout()
      .then(res => {
        dispatch(logout());
        localStorage.clear();
      })
      .catch(err => {
        console.log(err, "로그아웃 안됨");
      });
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) => {
      produce(state, draft => {
        draft.user = null;
        draft.is_login = false;
      });
    },
  },
  initialState
);

const actionCreators = {
  loginMiddleware,
  logoutMiddleware,
  signupMilddleware,
};

export { actionCreators };
