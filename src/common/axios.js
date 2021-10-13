import axios from "axios";

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://localhost:4000/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

export const apis = {
  // 게시물 불러오기
  getPost: () => instance.get("/posts"),
  // 하나의 게시물 불러오기
  getOnePost: postId => instance.get("/posts", postId),
  //게시물 생성
  createPost: content => instance.post("/posts", content),
  // 게시물 수정
  editPost: (postId, content) => instance.put(`/posts/${postId}`, content),
  // 게시물 삭제
  delPost: postId => instance.delete(`/posts/${postId}`),

  // comment
  getComment: postId => instance.get("/comments", postId),
  addComment: (postId, commentUserId, commentDesc) =>
    instance.get("/addcomments", { postId, commentUserId, commentDesc }),
};
