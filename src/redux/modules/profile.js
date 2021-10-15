import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const UPDATE_PROFILE = "UPDATE_PROFILE";

const updateProfile = createAction(UPDATE_PROFILE, (user) => ({ user }));

const initialState = {
  list: [],
};

const updateProfileMiddleware = (userPic, userIntro) => {
  return function (dispatch, getState, { history }) {
    apis.updateProfile().then((res) => {
      dispatch(
        updateProfile({
          userPic: res.data.userPic,
          userIntro: res.data.userData,
        })
      );
      console.log(userPic, userIntro);
      window.alert("회원정보가 업데이트 되었습니다.");
      history.push("/");
    });
  };
};

export default handleActions(
  {
    [UPDATE_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        //여기 유저 맞나여 ?
        draft.user = action.payload.user;
      }),
  },
  initialState
);

const profileActions = {
  updateProfileMiddleware,
};

export { profileActions };