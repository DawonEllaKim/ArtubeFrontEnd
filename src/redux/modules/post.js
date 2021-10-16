import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_POST = "GET_POST";
const GET_MY_POST = "GET_MY_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, post_list => ({ post_list }));
const getMyPost = createAction(GET_MY_POST, my_post_list => ({
  my_post_list,
}));
const addPost = createAction(ADD_POST, post => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, postId => ({ postId }));

const initialState = {
  list: [],
  is_loading: false,
};

const getPostMiddleware = postId => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then(res => {
        const post_list = res.data.post;
        if (postId) {
          const post = post_list.filter(p => p.postId === postId)[0];
          dispatch(getPost(post));
        } else {
          dispatch(getPost(post_list));
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const getMyPostMiddleware = userId => {
  return function (dispatch, getState, { history }) {
    console.log(userId);
    apis
      .getMyPost(userId)
      .then(res => {
        console.log(res);
        const my_post_list = res.data.myPagePost;
        dispatch(getMyPost(my_post_list));
      })
      .catch(err => console.error(err));
  };
};

const addPostMiddleware = _post => {
  return function (dispatch, getState, { history }) {
    console.log(_post);
    const initialvideoId = _post.url.split("=")[1];

    const videoId = initialvideoId.split("&")[0];

    const post = {
      title: _post.title,
      youtube_url: _post.url,
      image_url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      video_url: `https://www.youtube.com/embed/${videoId}`,
      desc: _post.desc,
    };

    // www.youtube.com/watch?v=IRyJe-0Uie0&ab_channel=Musictag

    apis
      .createPost(post)
      .then(res => {
        console.log(res);
        const post = res.data.newPost;
        dispatch(addPost(post));
        history.push("/");
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const editPostMiddleware = (postId, _post) => {
  return function (dispatch, getState, { history }) {
    const videoId = _post.youtube_url.split("=")[1];

    const post = {
      title: _post.title,
      youtube_url: _post.url,
      image_url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      video_url: `https://www.youtube.com/embed/${videoId}`,
      desc: _post.desc,
    };

    console.log(post);

    apis
      .editPost(
        postId,
        post.title,
        post.youtube_url,
        post.desc,
        post.image_url,
        post.video_url
      )
      .then(res => {
        console.log(res);
        // dispatch(editPost(postId, post));
        history.push(`/`);
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const deletePostMiddleware = postId => {
  return function (dispatch, getState, { history }) {
    apis.deletePost(postId).then(res => {
      console.log(res);
      dispatch(deletePost(postId));
      history.push("/");
    });
    return null;
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.post_list;
      }),
    [GET_MY_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.my_post_list;
        console.log(draft.list);
      }),
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.post);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = draft.list.filter(p => p.id !== action.payload.postId);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, draft => {
        let idx = draft.list.findIndex(p => p.id === action.payload.postId);
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
  getMyPostMiddleware,
  addPostMiddleware,
  editPostMiddleware,
  deletePostMiddleware,
};

export { postActions };
