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
    console.log(typeof postId, postId);
    apis.getComment(postId).then(res => {
      const _comment_list = res.data;
      console.log(_comment_list);
      const comment_list = _comment_list.filter(c => c.postId === postId);
      dispatch(getComment(comment_list));
    });
  };
};

const addCommentMiddleware = (post_id, commentDesc) => {
  return function (dispatch, getState, { history }) {
    const comment = {
      id: String(parseInt(getState().comment.list.length) + 1),
      postId: post_id,
      commentDesc: commentDesc,
      commentUserId: "aslkdfjas",
      commentDate: "2021-10-12",
    };
    apis.addComment(comment).then(res => {
      dispatch(addComment(comment));
    });
  };
};

const deleteCommentMiddleware = commentId => {
  return function (dispatch, getState, { history }) {
    apis.deleteComment(commentId).then(res => {
      dispatch(deleteComment(commentId));
    });

    return null;
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
  },
  initialState
);

const commentActions = {
  getCommentMiddleware,
  addCommentMiddleware,
  deleteCommentMiddleware,
};

export { commentActions };
