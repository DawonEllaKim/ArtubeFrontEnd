import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, post_list => ({ post_list }));
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

const getPostMiddleware = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then(res => {
        const post_list = res.data;
        dispatch(getPost(post_list));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const addPostMiddleware = _post => {
  return function (dispatch, getState, { history }) {
    console.log(_post);
    const videoId = _post.url.split("=")[1];

    const post = {
      id: String(parseInt(getState().post.list.length) + 1),
      userId: "나당",
      title: _post.title,
      youtube_url: _post.url,
      image_url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      video_url: `https://www.youtube.com/embed/${videoId}`,
      desc: _post.desc,
      date: "2021-10-11",
    };

    apis
      .createPost(post)
      .then(res => {
        // const post = res.data
        dispatch(addPost(post));
        history.push("/");
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const getOnePostMiddleware = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then(res => {
        const post_list = res.data;
        dispatch(getPost(post_list));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const editPostMiddleware = (postId, _post) => {
  return function (dispatch, getState, { history }) {
    const videoId = _post.url.split("=")[1];

    const post = {
      id: postId,
      userId: "나당",
      title: _post.title,
      youtube_url: _post.url,
      image_url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      video_url: `https://www.youtube.com/embed/${videoId}`,
      desc: _post.desc,
      date: "2021-10-11",
    };

    apis
      .editPost(postId, post)
      .then(res => {
        console.log(res);
        dispatch(editPost(postId, post));
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
        draft.list.filter(p => p.id !== action.payload.postId);
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
  addPostMiddleware,
  editPostMiddleware,
  deletePostMiddleware,
  getOnePostMiddleware,
};

export { postActions };
