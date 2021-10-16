import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const getComment = createAction(GET_COMMENT, (comment_list) => ({
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));

const initialState = {
  list: [],
  is_loading: false,
};

const getCommentMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis.getComment(postId).then((res) => {
      const comment_list = res.data.comment;
      dispatch(getComment(comment_list));
    });
  };
};

const addCommentMiddleware = (_comment) => {
  return function (dispatch, getState, { history }) {
    const userId = getState().user.user.userId;

    apis
      .addComment(userId, _comment.commentDesc, _comment.postId)
      .then((res) => {
        const comment = {
          userId,
          _comment,
          commentId: res.data.commentId,
        };
        dispatch(addComment(comment));

        window.location.replace("/");
      });
  };
};

const deleteCommentMiddleware = (commentId, commnetUserId) => {
  return function (dispatch, getState, { history }) {
    console.log(commentId, commnetUserId);
    apis
      .deleteComment(commentId, commnetUserId)
      .then((res) => {
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.comment);
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment_list;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (c) => c.commentId !== action.payload.commentId
        );
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
