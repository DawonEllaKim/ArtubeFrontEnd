import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const GET_POST = "GET_POST";
const GET_MY_POST = "GET_MYPOST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, post_list => ({ post_list }));
const getMyPost = createAction(GET_MY_POST, my_post_list => ({ my_post_list }));
const addPost = createAction(ADD_POST, post => ({ post }));

const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));

const initialState = {
  list: [],
  is_loading: false,
};

const getPostMiddleware = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then((res) => {
        const post_list = res.data.post;
        dispatch(getPost(post_list));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const getMyPostMiddleware = userId => {
  return function (dispatch, getState, { histoey }) {
    // console.log('아이디 받아오기' userId)
    apis
      .getMyPost(userId)
<<<<<<< HEAD
      .then(res => {
        console.log(res);
        const my_post_list = res.data.post;
=======
      .then((res) =>{
        console.log(res)
        const my_post_list = res.data.myPagePost;
>>>>>>> myprofile
        // console.log('디스패치 할 리스트'  my_post_list)
        dispatch(getMyPost(my_post_list));
      })
      .catch(err => console.error(err));
  };
};

const addPostMiddleware = _post => {

  return function (dispatch, getState, { history }) {
    console.log(_post);
    const videoId = _post.url.split("=")[1];

    const post = {
      title: _post.title,
      youtube_url: _post.url,
      image_url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      video_url: `https://www.youtube.com/embed/${videoId}`,
      desc: _post.desc,
    };

    apis
      .createPost(post)
      .then((res) => {
        console.log(res);
        // const post = res.data
        // dispatch(addPost(post));
        history.push("/");
      })
      .catch((err) => {
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
      .then((res) => {
        console.log(res);
        // dispatch(editPost(postId, post));
        history.push(`/`);
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const deletePostMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis.deletePost(postId).then((res) => {
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
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
      }),
    [GET_MY_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.my_post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.id !== action.payload.postId);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.postId);
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
