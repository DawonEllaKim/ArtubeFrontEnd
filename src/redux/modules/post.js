import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../lib/axios";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";

const getPost = createAction(GET_POST, posts => ({ posts }));
const addPost = createAction(ADD_POST, post => ({ post }));

const initialState = {
  list: [],
  is_loading: false,
};

const getPostMiddleware = () => {
  return function (dispatch) {
    apis
      .getPost()
      .then(res => {
        const posts = res.data;
        dispatch(getPost(posts));
        console.log(posts);
      })
      .catch(err => {
        console.log("포스트 데이터 못가져옴");
      });
  };
};

const addPostMiddleware = post => {
  return function (dispatch) {
    apis
      .addPost(post)
      .then(res => {
        dispatch(addPost(post));
      })
      .catch(err => {
        console.log(err);
      });
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
  },
  initialState
);

const actionCreators = {
  getPostMiddleware,
  addPostMiddleware,
};

export { actionCreators };
