import axios from "axios";

const instance = axios.create({
  // base url 정보 수정해야함
  baseURL: "3.34.90.85",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

export const apis = {
  // 게시물 호출
  getPost: () => instance.get("/api"),
  // 게시물 작성
  addPost: contents => instance.post("/api/myPage", contents),
  // 게시물 수정
  editPost: (id, content) => instance.put(`/api/myPage/${id}`, content),
  // 게시물 삭제
  delPost: id => instance.delete(`/posts/${id}`),

  //로그인 관련
  signup: user => instance.post("/api/signUp", user),
  login: (id, pwd) => instance.post("/api/signin", { id, pwd }),
  logout: () => instance.get("/logout"),
};
