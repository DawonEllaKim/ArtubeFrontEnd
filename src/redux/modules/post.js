import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, posts => ({ posts }));
const addPost = createAction(ADD_POST, post => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, content) => ({
  post_id,
  content,
}));
const deletePost = createAction(DELETE_POST, post_id => ({ post_id }));

const initialState = {
  list: [],
  is_loading: false,
};

const getPostMiddleware = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then(res => {
        const posts = res.data;
        dispatch(getPost(posts));
        history.push("/");
      })
      .catch(err => {
        console.log(err, "포스트 데이터 못가져옴");
      });
  };
};

const addPostMiddleware = _post => {
  return function (dispatch, getState, { history }) {
    apis
      .addPost(_post)
      .then(res => {
        // 포스트 데이터 어떻게 넘겨줄지 확인해야함.
        const post = res.data;
        dispatch(addPost(post));
      })
      .catch(err => {
        console.log(err, "포스트 업데이트 못함");
      });
  };
};

const editPostMiddleware = () => {
  return function (dispatch, getState, { history }) {
    return null;
  };
};

const deletePostMiddleware = post_id => {
  return function (dispatch, getState, { history }) {
    return null;
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, draft => {
        console.log(action.payload.posts);
        draft.list = action.payload.posts;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.push(action.payload.post);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.filter(p => p.id !== action.payload.post_id);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, draft => {
        let idx = draft.list.findIndex(p => p.id === action.payload.post_id);
        draft.list[idx] = {
          ...draft.list[idx],
          ...action.payload.post,
        };
      }),
  },
  initialState
);

const actionCreators = {
  getPostMiddleware,
  addPostMiddleware,
  editPostMiddleware,
  deletePostMiddleware,
};

export { actionCreators };
