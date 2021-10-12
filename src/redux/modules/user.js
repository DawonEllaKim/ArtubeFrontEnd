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
  return function (dispatch, getState, { history }) {
    history.push("/signup");
    console.log(user);

    apis
      .signup(user)
      .then(res => {
        console.log(res);
        if (res.result === "success") {
          localStorage.setItem("token", res.token);
          // state.user 데이터에 uid 추가해서 넣기 위해서 uid 받아와야함
          // res.data에 uid만 넘겨줄지, user정보 전체 넘겨줄지 알아야함.
          dispatch(setUser(user));
          history.push("/");
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
  return function (dispatch, getState, { history }) {
    apis
      .login(id, pwd)
      .then(res => {
        if (res.result === "success") {
          localStorage.setItem("token", res.token);
          // state.user 데이터에 uid 추가해서 넣기 위해서 uid 받아와야함
          // res.data에 uid만 넘겨줄지, user정보 전체 넘겨줄지 알아야함.
          const user = res.data;

          dispatch(setUser(user));
          history.push("/");
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
        localStorage.clear();
        dispatch(logout());
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
