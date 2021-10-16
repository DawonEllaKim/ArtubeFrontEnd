import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_PROFILE = "GET_PROFILE";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const SET_PREVIEW = "SET_PREVIEW";

const getProfile = createAction(GET_PROFILE, user => ({ user }));
const updateProfile = createAction(UPDATE_PROFILE, userInfo => ({
  userInfo,
}));
const setPreview = createAction(SET_PREVIEW, preview => ({ preview }));

const initialState = {
  userInfo: null,
  preview: null,
};

const getUserProfile = userId => {
  return function (dispatch, getState, { history }) {
    apis.getUserProfile(userId).then(res => {
      console.log(res);
      const user = res.data.userProfile;
      console.log(user);
      dispatch(getProfile(user));
    });
  };
};

const updateProfileMiddleware = (userIntro) => {
  return function (dispatch, getState, { history }) {
    const userId = getState().user.userId;
    console.log(userIntro);
    const userInfo = {
      userIntro,
    };
    apis.editUserProfile(userIntro).then(res => {
      console.log(res);
      dispatch(updateProfile(userIntro));
      // history.push(`/`);
    });
    console.log(userId);
    console.log(userInfo);
    console.log(userIntro)
  };
};

export default handleActions(
  {
    [UPDATE_PROFILE]: (state, action) =>
      produce(state, draft => {
        const  userIntro  = action.payload.userInfo;
        console.log(userIntro)
        draft.userInfo = {
          ...draft.userInfo,
          // userPic: userPic ? userPic : null,
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
