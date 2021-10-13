import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const getComment = createAction(GET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const initialState = {
  list: [],
  is_loading: false,
};

const getCommentMiddleware = (post_id) => {
  return function (dispatch, getState, { history }) {
    apis.getComment(post_id).then((res) => {
      const comment_list = res.data;
      console.log(comment_list);
      dispatch(getComment(post_id, comment_list));
    });
    return null;
  };
};

const addCommentMiddleware = (comment) => {
  return function (dispatch, getState, { history }) {
    console.log(comment);
    apis.addComment(comment).then((res) => {
      console.log(res.data);
    });
  };
};

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.comment);
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.comment_list);
        draft.list = action.payload.comment_list;
      }),
  },
  initialState
);

const commentActions = {
  getCommentMiddleware,
  addCommentMiddleware,
};

export { commentActions };
