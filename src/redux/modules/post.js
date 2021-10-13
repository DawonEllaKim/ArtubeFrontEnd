import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, post_list => ({ post_list }));
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
        const post_list = res.data;
        console.log(post_list);
        dispatch(getPost(post_list));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const addPostMiddleware = _post => {
  return function (dispatch, getState, { history }) {
    apis
      .createPost(_post)
      .then(() => {
        // dispatch(AddPost(post));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const editPostMiddleware = (post_id, post) => {
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
        console.log(action.payload.post_list);
        draft.list = action.payload.post_list;
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

const postActions = {
  getPostMiddleware,
  addPostMiddleware,
  editPostMiddleware,
  deletePostMiddleware,
};

export { postActions };
