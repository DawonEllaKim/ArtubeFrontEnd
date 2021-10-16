import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_PROFILE = "GET_PROFILE";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const SET_PREVIEW = "SET_PREVIEW";

const getProfile = createAction(GET_PROFILE, user => ({ user }));
<<<<<<< HEAD
const updateProfile = createAction(UPDATE_PROFILE, userInfo => ({ userInfo }));
=======
const updateProfile = createAction(UPDATE_PROFILE, userInfo => ({
  userInfo,
}));
>>>>>>> d9087400911fc825a1cc038c331814039c94fd1b
const setPreview = createAction(SET_PREVIEW, preview => ({ preview }));

const initialState = {
  userInfo: null,
  preview: null,
};

<<<<<<< HEAD

=======
>>>>>>> d9087400911fc825a1cc038c331814039c94fd1b
const getUserProfile = userId => {
  return function (dispatch, getState, { history }) {
    apis.getUserProfile(userId).then(res => {
      console.log(res);
      const user = res.data.userProfile;
<<<<<<< HEAD
=======
      console.log(user);
>>>>>>> d9087400911fc825a1cc038c331814039c94fd1b
      dispatch(getProfile(user));
    });
  };
};

const updateProfileMiddleware = (userPic, userIntro) => {
  return function (dispatch, getState, { history }) {
    const userId = getState().user.userId;
    console.log(userPic, userIntro);
    const userInfo = {
      userPic,
      userIntro,
    };
    apis.editUserProfile(userPic, userIntro).then(res => {
      console.log(res);
      dispatch(updateProfile(userPic, userIntro));
      // history.push(`/`);
      console.log(userId);
    });
  };
};

export default handleActions(
  {
    [UPDATE_PROFILE]: (state, action) =>
      produce(state, draft => {
        const { userPic, userIntro } = action.payload.user;
        draft.userInfo = {
          ...draft.userInfo,
          userPic: userPic ? userPic : null,
          userIntro: userIntro ? userIntro : null,
        };
      }),
    [GET_PROFILE]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.user;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, draft => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const profileActions = {
  updateProfileMiddleware,
  getUserProfile,
  setPreview,
};

export { profileActions };
