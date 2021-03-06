import axios from "axios";

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소

  // 성규님 주소
  baseURL: "http://3.34.95.37",

  // 유정님 주소
  // baseURL: "http://3.35.141.41",

  //제이슨 서버
  // baseURL: "http://localhost:4000",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
    // "Access-Control-Allow-Origin": true,
  },
});

export const apis = {
  // 게시물 불러오기
  // 게시물 불러오기
  getPost: () => instance.get("/post/main"),
  // 유저에게 맞는 게시물 불러오기
  getMyPost: (userId) => instance.get(`/post/myPage/${userId}`),
  // 게시물 작성하기
  createPost: (contents) => instance.post("/post", contents),
  // 게시물 수정하기
  editPost: (id, title, youtube_url, desc, image_url, video_url) =>
    instance.put(`/post/myPage/${id}`, {
      title,
      youtube_url,
      desc,
      image_url,
      video_url,
    }),
  // 게시물 삭제하기
  deletePost: (id) => instance.delete(`/post/detail/${id}`),

  // comment

  getComment: (postId) => instance.get(`/comment/comment/${postId}`),
  deleteComment: (commentId, commentUserId) =>
    instance.delete(`/comment/comment/${commentId}`, commentUserId),
  addComment: (commentUserId, commentDesc, postId) =>
    instance.post("/comment/comment", { commentUserId, commentDesc, postId }),

  signUp: (data) => instance.post("/user/signUp", data),
  signIn: (data) => instance.post("/user/signIn", data),

  userCheck: () => instance.get("/user/me"),

  getUserProfile: (userId) => instance.get(`/user/userProfile/${userId}`),

  editUserProfile: (userPic, userIntro) =>
    instance.put("/user/me", { userPic, userIntro }),
};
