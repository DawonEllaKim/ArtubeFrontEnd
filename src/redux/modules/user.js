import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, user => ({ user }));
const logout = createAction(LOG_OUT, user => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const signupMilddleware = (userId, password, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    console.log(userId);
    axios({
      method: "POST",
      url: "/user/signUp",

      data: {
        userId: userId,
        password: password,
        confirmPassword: confirmPassword,
      },
    })
      .then(res => {
        console.log(res); // signup 정보 확인
        window.alert("축하합니다");
        history.push("/login");
      })
      .catch(err => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("회원가입에 실패했습니다.");
      });
  };
};

// const signupMilddleware = (userId, password, confirmPassword) => {
//   async (dispatch, getState, { history }) => {
//     await api
//       .post(`/user/register`, {
//         userId: userId,
//         password: password,
//         passwordConfirm: confirmPassword,
//       })
//       .then(res => {
//         window.alert("환영합니다");
//         history.push("/login");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// };

// apis
//   .signup(userId, password, confirmPassword)
//   .then(response => {
//     console.log(response);
//     if (response.result === "success") {
//       localStorage.setItem("token", response.token);
//       // state.user 데이터에 uid 추가해서 넣기 위해서 uid 받아와야함
//       // res.data에 uid만 넘겨줄지, user정보 전체 넘겨줄지 알아야함.
//       // dispatch(setUser(user));
//       history.push("/");
//     } else {
//       console.log(response.errorMessage);
//     }
//   })
//   .catch(err => {
//     console.log(err, "회원가입 안됨");
//   });

// apis
//   .signup(userId, password, confirmPassword)
//   .then(response => {
//     console.log(response);
//     if (response.result === "success") {
//       localStorage.setItem("token", response.token);
//       // state.user 데이터에 uid 추가해서 넣기 위해서 uid 받아와야함
//       // res.data에 uid만 넘겨줄지, user정보 전체 넘겨줄지 알아야함.
//       // dispatch(setUser(user));
//       history.push("/");
//     } else {
//       console.log(response.errorMessage);
//     }
//   })
//   .catch(err => {
//     console.log(err, "회원가입 안됨");
//   });

const loginMiddleware = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    // apis
    //   .login(id, pwd)
    //   .then(res => {
    //     if (res.result === "success") {
    //       localStorage.setItem("token", res.token);
    //       // state.user 데이터에 uid 추가해서 넣기 위해서 uid 받아와야함
    //       // res.data에 uid만 넘겨줄지, user정보 전체 넘겨줄지 알아야함.
    //       const user = res.data;
    //       dispatch(setUser(user));
    //       history.push("/");
    //     } else {
    //       console.log(res.errorMessage);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err, "로그인 안됨");
    //   });
  };
};

const logoutMiddleware = () => {
  return function (dispatch) {
    // API 설계에서 logout 빠짐
    // apis
    //   .logout()
    //   .then(res => {
    //     localStorage.clear();
    //     dispatch(logout());
    //   })
    //   .catch(err => {
    //     console.log(err, "로그아웃 안됨");
    //   });
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
