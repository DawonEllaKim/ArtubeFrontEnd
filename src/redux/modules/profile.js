import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_PROFILE = "GET_PROFILE";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const SET_PREVIEW = "SET_PREVIEW";

const getProfile = createAction(GET_PROFILE, userInfo => ({ userInfo }));
const updateProfile = createAction(UPDATE_PROFILE, userInfo => ({ userInfo }));
const setPreview = createAction(SET_PREVIEW, preview => ({ preview }));

const initialState = {
  userInfo: null,
  preview: null,
};

const getProfleMiddleware = token => {
  return function (dispatch, getState, { history }) {
    apis.userCheck().then(res => {
      const user = res.data.user;
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
      dispatch(updateProfile(userInfo));
      history.push(`/`);
    });
  };
};

export default handleActions(
  {
    [UPDATE_PROFILE]: (state, action) =>
      produce(state, draft => {
        const { userPic, userIntro } = action.payload.userInfo;
        draft.userInfo = {
          ...draft.userInfo,
          userPic: userPic,
          userIntro: userIntro,
        };
      }),
    [GET_PROFILE]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
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
  getProfleMiddleware,
  setPreview,
};

export { profileActions };
