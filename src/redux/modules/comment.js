import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const getComment = createAction(GET_COMMENT, comment_list => ({
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, comment => ({
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, commentId => ({
  commentId,
}));

const initialState = {
  list: [],
  is_loading: false,
};

const getCommentMiddleware = postId => {
  return function (dispatch, getState, { history }) {
    apis.getComment(postId).then(res => {
      const _comment_list = res.data.comment;
      const comment_list = _comment_list.filter(c => c.postId === postId);
      dispatch(getComment(comment_list));
    });
  };
};

const addCommentMiddleware = (commentUserId, commentDesc, postId) => {
  return function (dispatch, getState, { history }) {
    // (commentUserId, commentDesc, postId)

    console.log(commentUserId, commentDesc, postId);

    apis.addComment(commentUserId, commentDesc, postId).then(res => {
      console.log(res);
      const comment = {
        commentId: res.data.commentId,
        commentUserId: commentUserId,
        commentDesc: commentDesc,
        postId,
      };
      dispatch(addComment(comment));
    });
  };
};

const deleteCommentMiddleware = commentId => {
  return function (dispatch, getState, { history }) {
    console.log(commentId);
    apis.deleteComment(commentId).then(res => {
      console.log(res);
      dispatch(deleteComment(commentId));
    });
  };
};

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.comment);
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.comment_list;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, draft => {
        draft.list = draft.list.filter(c => c.id !== action.payload.commentId);
      }),
  },
  initialState
);

const commentActions = {
  getCommentMiddleware,
  addCommentMiddleware,
  deleteCommentMiddleware,
};

export { commentActions };
