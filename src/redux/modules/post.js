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
      })
      .catch(err => {
        console.log(err, "포스트 데이터 못가져옴");
      });
  };
};

const addPostMiddleware = post => {
  return function (dispatch) {
    const posting = {
      id: 4,
      ...post,
      insert_dt: "2021-10-01",
    };
    apis
      .addPost(posting)
      .then(res => {
        dispatch(addPost(posting));
      })
      .catch(err => {
        console.log(err, "포스트 업데이트 못함");
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
