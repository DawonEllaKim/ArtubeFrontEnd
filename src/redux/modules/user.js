import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOGOUT";

const setUser = createAction(SET_USER, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));
const logout = createAction(LOG_OUT, user => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const loginMiddleware = (id, pwd) => {
  // return function (dispatch, getState, { history }) {
  //   auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(res => {
  //     auth
  //       .signInWithEmailAndPassword(id, pwd)
  //       .then(user => {
  //         console.log(user);
  //         dispatch(
  //           setUser({
  //             user_name: user.user.displayName,
  //             id: id,
  //             user_profile: "",
  //             uid: user.user.uid,
  //           })
  //         );
  //         history.push("/");
  //       })
  //       .catch(error => {
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         console.log(errorCode, errorMessage);
  //       });
  //   });
  // };
};

const logoutMiddleware = () => {
  // return function (dispatch, getState, { history }) {
  //   auth.signOut().then(() => {
  //     dispatch(logOut());
  //     history.replace("/");
  //   });
  // };
};

const signupMilddleware = (id, pwd, user_name) => {
  // return function (dispatch, getState, { history }) {
  //   auth
  //     .createUserWithEmailAndPassword(id, pwd)
  //     .then(user => {
  //       auth.currentUser
  //         .updateProfile({
  //           displayName: user_name,
  //         })
  //         .then(() => {
  //           dispatch(
  //             setUser({
  //               user_name: user_name,
  //               id: id,
  //               user_profile: "",
  //               uid: user.user.uid,
  //             })
  //           );
  //           history.push("/");
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //       // Signed in
  //       // ...
  //     })
  //     .catch(error => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //       // ..
  //     });
  // };
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
    [GET_USER]: (state, action) => {
      produce(state, draft => {});
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
