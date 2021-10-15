import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const GET_MY_POST = "GET_MY_POST";

const getPost = createAction(GET_POST, post_list => ({ post_list }));
const addPost = createAction(ADD_POST, post => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, postId => ({ postId }));
const getMyPost = createAction(GET_MY_POST, post_list => ({ post_list }));

const initialState = {
  list: [],
  is_loading: false,
};

const getPostMiddleware = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then(res => {
        const post_list = res.data.post;
        dispatch(getPost(post_list));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const getMyPostMiddleware = userId => {
  return function (dispatch, getState, { history }) {
    apis.myPost(userId).then(res => {
      const post_list = res.data.post;
      dispatch(getMyPost(post_list));
    });
  };
};

const addPostMiddleware = _post => {
  return function (dispatch, getState, { history }) {
    console.log(_post);
    const videoId = _post.url.split("=")[1];

    const temp_post = {
      title: _post.title,
      youtube_url: _post.url,
      image_url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      video_url: `https://www.youtube.com/embed/${videoId}`,
      desc: _post.desc,
    };

    apis
      .createPost(temp_post)
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
    console.log(postId);
    apis
      .deletePost(postId)
      .then(res => {
        console.log(res);
        dispatch(deletePost(postId));
        history.push("/");
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
        draft.list.push(...action.payload.post_list);

        // 중복 post가 있다면 제거
        // cur에 postlist값이 하나하나 들어올텐데
        // postlist id와 cur id가 같은게 없으면 -1
        // -1인 값만 acc에 넣어주기
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex(a => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex(a => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
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
    [GET_MY_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const postActions = {
  getPostMiddleware,
  addPostMiddleware,
  editPostMiddleware,
  deletePostMiddleware,
  getMyPostMiddleware,
};

export { postActions };
